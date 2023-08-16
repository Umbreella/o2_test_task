from django.contrib.gis.db import models as geo_models
from django.db import models

from .GasStation import GasStation


class RoadRoute(models.Model):
    start_point = models.CharField(max_length=255)
    end_point = models.CharField(max_length=255)
    geo_route = geo_models.MultiLineStringField()
    gas_stations = models.ManyToManyField(GasStation, blank=True,
                                          related_name='road_routes')

    def __str__(self):
        return f'{self.start_point} -> {self.end_point}'
