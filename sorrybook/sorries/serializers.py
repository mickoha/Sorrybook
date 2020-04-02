from rest_framework import serializers
from .models import Sorry
from comment.models import Comment

# Sorry Serializer
class SorrySerializer(serializers.ModelSerializer):
  comments = serializers.SerializerMethodField()
  
  class Meta:
    model = Sorry
    fields = ('owner', 'apologist', 'content', 'created_at', 'likes', 'comments')

  def get_comments(self, obj):
      comments = Comment.objects.filter(sorry=obj.id)
      return comments.count()
    

  