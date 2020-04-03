from rest_framework import serializers
from .models import Sorry

from comment.models import Comment

# Sorry Serializer
class SorrySerializer(serializers.ModelSerializer):
  comments = serializers.SerializerMethodField()
  class Meta:
    model = Sorry
    fields = ('id', 'apologist', 'content', 'created_at', 'owner', 'likes', 'comments')

  def get_comments(self, request):
    return Comment.objects.filter(sorry=request.id).count()