from .models import Sorry
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import SorrySerializer
from django.views.decorators.csrf import csrf_exempt

# Sorry Viewset
class SorryViewSet(viewsets.ModelViewSet):
  queryset = Sorry.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = SorrySerializer

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)

  def destroy(self, request, *args, **kwargs):
    obj = self.get_object()
    if request.user == obj.owner:
      Sorry.objects.filter(id=obj.id).delete()
      return Response(status=200)
    else:
      return Response(status=400)

@api_view(['POST'])
def like_sorry(request):
  sorry = get_object_or_404(Sorry, id=request.data)
  if sorry.likes.filter(id=request.user.id).exists():
    sorry.likes.remove(request.user)
    serializer = SorrySerializer(sorry)
    return Response(serializer.data, status=201)
  else:     
    sorry.likes.add(request.user)
    serializer = SorrySerializer(sorry)
    return Response(serializer.data, status=201)