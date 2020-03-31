from rest_framework import serializers 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from knox.models import AuthToken
from profiles.serializers import ProfileSerializer
from profiles.models import Profile

# User serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
  profile = ProfileSerializer

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = { 'password': { 'write_only': True }}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
    Profile.objects.create(user=user, id=user.id)
    return user

# Login serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user 
    raise serializers.ValidationError("Incorrect credentials")