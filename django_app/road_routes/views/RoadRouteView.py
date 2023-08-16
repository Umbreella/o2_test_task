from rest_framework import filters
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from ..models.RoadRoute import RoadRoute
from ..serializers.ListRoadRouteSerializer import ListRoadRouteSerializer
from ..serializers.RoadRouteSerializer import RoadRouteSerializer


class RoadRouteView(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = RoadRoute.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RoadRouteSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering = ('id',)

    def list(self, request, *args, **kwargs):
        self.serializer_class = ListRoadRouteSerializer

        return super().list(request, *args, **kwargs)
