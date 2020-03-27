from rest_framework import serializers 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from knox.models import AuthToken

# User serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = { 'password': { 'write_only': True }}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
    print(user)
    return user

# Login serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    print(data)
    user = authenticate(**data)
    print(user)
    if user and user.is_active:
      return user 
    raise serializers.ValidationError("Incorrect credentials")