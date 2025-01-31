from rest_framework import serializers
from .models import Message, Chat
from django.contrib.auth.models import User

from accounts.serializers import UserSerializer


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    chatId = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ('id', 'content', 'created_at', 'username', 'chatId')

    def get_username(self, request):
        user = User.objects.get(id=request.owner.id)
        return user.username

    def get_chatId(self, request):
        chat = Chat.objects.get(messages=request.id)
        return chat.id


class ChatSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'participants')
