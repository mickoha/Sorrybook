from django.db import models

from django.contrib.auth.models import User


class Message(models.Model):
    owner = models.ForeignKey(
        User, related_name="user_message", on_delete=models.CASCADE, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Chat(models.Model):
    messages = models.ManyToManyField(
        Message, related_name="chat_messages", blank=True)
    participants = models.ManyToManyField(
        User, related_name="chat_users", blank=True)
