from rest_framework import filters
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from ..models.GasStation import GasStation
from ..serializers.GasStationSerializer import GasStationSerializer


class GasStationView(ListModelMixin, GenericViewSet):
    queryset = GasStation.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = GasStationSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering = ('id',)

    def list(self, request, *args, **kwargs):
        road_route_pk = kwargs.get('road_route_pk', None)

        if road_route_pk:
            # self.queryset = self.queryset.exclude(
            self.queryset = self.queryset.filter(
                road_routes__id=road_route_pk
            )

        return super().list(request, *args, **kwargs)
