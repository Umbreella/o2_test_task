from django.urls import path

from .views.GasStationView import GasStationView
from .views.RoadRouteView import RoadRouteView

urlpatterns = [
    path(**{
        'route': '',
        'view': RoadRouteView.as_view({
            'get': 'list',
        }),
    }),
    path(**{
        'route': '<int:pk>/',
        'view': RoadRouteView.as_view({
            'get': 'retrieve',
        }),
    }),
    path(**{
        'route': '<int:road_route_pk>/gas_stations/',
        'view': GasStationView.as_view({
            'get': 'list',
        }),
    }),
]
