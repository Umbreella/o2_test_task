from django.contrib.gis.db import models as geo_models
from django.db import models


class GasStation(models.Model):
    geo_position = geo_models.PointField()
    diesel_fuel = models.CharField(max_length=255, default='', blank=True)
    diesel_fuel_taneco = models.CharField(max_length=255, default='',
                                          blank=True)

    def __str__(self):
        return f'{self.id} {self.geo_position}'
