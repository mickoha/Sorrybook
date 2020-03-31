from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = '__all__'
    
  def patch(self, instance, validated_data):
    print(validated_data)
    instance.picture = validated_data.get('picture', instance.picture)
    instance.bio = validated_data.get('bio', instance.bio)
    return instance
