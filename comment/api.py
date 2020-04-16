from .models import Comment
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .serializers import CommentSerializer

from sorries.models import Sorry

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CommentSerializer

    def retrieve(self, request, pk):
        queryset = Comment.objects.filter(sorry=pk)
        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data, status=201)
    

@api_view(['POST'])
def create_comment(request):
    serializer = CommentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(owner=request.user)
    return Response(serializer.data, status=201)

@api_view(['DELETE'])
def delete_comment(request, pk):
    comment = get_object_or_404(Comment, id=pk)
    returnedComment = CommentSerializer(comment).data
    if (comment.owner == request.user):
        comment.delete()
        return Response(returnedComment, status=200)
    else:
        return Response('You cant delete this comment', status=400)

    

