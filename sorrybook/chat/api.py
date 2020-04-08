from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import MessageSerializer, ChatSerializer
from .models import Chat, Message

from django.contrib.auth.models import User


class ChatListView(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permissions_classses = [
        permissions.AllowAny
    ]

    def retrieve(self, request):
        user = User.objects.get(id=request.user.id)
        set = Chat.objects.all()
        list = []
        for chat in set:
            if chat.participants.filter(id=user.id).exists():
                list.append(ChatSerializer(chat).data)

        return Response(list, status=201)


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-created_at')[:10]


@api_view(['POST'])
def create_chat(data):
    participants = data.data.pop('participants')
    chat = Chat()
    chat.save()

    for username in participants:
        chat.participants.add(username)
    chat.save()
    returnedChat = ChatSerializer(chat).data
    return Response(returnedChat, status=201)


@api_view(['DELETE'])
def delete_chat(request, pk):
    print(pk)
    chat = get_object_or_404(Chat, id=pk)
    retunedChat = ChatSerializer(chat).data
    chat.delete()
    return Response(retunedChat, status=200)
