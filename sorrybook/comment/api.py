from .models import Comment
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import CommentSerializer

from sorries.models import Sorry

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CommentSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)