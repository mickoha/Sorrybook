from .models import Profile
from rest_framework import viewsets, permissions, generics
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProfileSerializer
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User

class ProfileAPI(generics.RetrieveAPIView):
  permissions_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = ProfileSerializer
  queryset = Profile.objects.all()
  
  def retrieve(self, request, pk):
    profiles = Profile.objects.all()
    user = get_object_or_404(profiles, pk=pk)
    serializer = ProfileSerializer(user)
    return Response(serializer.data)

  def patch(self, request, *args, **kwargs):
    instance = self.get_object()
    serializer = self.get_serializer(instance, data=request.data, partial=True)
    print(serializer)
    serializer.is_valid(raise_exception=True)
    profile = serializer.save()

    return Response({
      "profile": ProfileSerializer(profile, context=self.get_serializer_context()).data
    })


class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  permissions_classes = [
    permissions.AllowAny
  ]

  serializer_class = UserSerializer
