from rest_framework import serializers

from ..models.GasStation import GasStation


class GasStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GasStation
        fields = (
            'id', 'geo_position', 'diesel_fuel', 'diesel_fuel_taneco',
        )
