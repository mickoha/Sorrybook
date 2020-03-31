from .models import Sorry
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import SorrySerializer

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