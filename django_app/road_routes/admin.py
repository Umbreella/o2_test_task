from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from leaflet.admin import LeafletGeoAdmin

from .models.GasStation import GasStation
from .models.RoadRoute import RoadRoute

admin.site.register(RoadRoute, LeafletGeoAdmin)


@admin.register(GasStation)
class GasStationAdmin(LeafletGeoAdmin, ImportExportModelAdmin):
    list_display = (
        'id', 'geo_position', 'diesel_fuel', 'diesel_fuel_taneco',
    )
    search_fields = (
        'id',
    )
