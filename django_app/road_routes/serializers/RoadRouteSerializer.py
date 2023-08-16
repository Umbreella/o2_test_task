from rest_framework import serializers

from ..models.RoadRoute import RoadRoute


class RoadRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadRoute
        fields = (
            'id', 'start_point', 'end_point', 'geo_route',
        )
