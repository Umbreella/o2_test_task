from rest_framework import serializers

from ..models.RoadRoute import RoadRoute


class ListRoadRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadRoute
        fields = (
            'id', 'start_point', 'end_point',
        )
