from rest_framework import serializers
from .models import Comment

from django.contrib.auth.models import User

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'sorry', 'owner', 'content', 'created_at', 'username')
    
    def get_username(self, request):
        return request.owner.username