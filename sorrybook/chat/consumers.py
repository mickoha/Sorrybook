import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message, Chat
from .serializers import MessageSerializer
from .api import get_last_10_messages
from rest_framework.response import Response

from django.contrib.auth.models import User


class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self, data):

        messages = get_last_10_messages(data['chatId'])
        messageList = []
        for message in messages:
            messageList.append(MessageSerializer(message).data)
        content = {
            'messages': messageList,
            'command': 'messages'
        }

        self.send_message(content)

    def new_message(self, data):

        author = data['from']
        author_user = User.objects.get(username=author)

        if author_user is None:
            return(404)

        chat = Chat.objects.get(id=data['chatId'])

        if chat.participants.filter(id=author_user.id).exists():
            message = Message.objects.create(
                owner=author_user, content=data['content'])

            chat.messages.add(message)
            content = {
                'command': 'new_message',
                'message': MessageSerializer(message).data
            }
            chat.save()
            return self.send_chat_message(content)
        else:
            print('here')
            return Response('You are not part in this chat', status=400)

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group

    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
