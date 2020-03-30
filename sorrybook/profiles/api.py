from .models import Profile
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer, UserSerializer
from django.contrib.auth.models import User

class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  permissions_classes = [
    permissions.AllowAny
  ]

  serializer_class = ProfileSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  permissions_classes = [
    permissions.AllowAny
  ]

  serializer_class = UserSerializer
