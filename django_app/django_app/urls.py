from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title='Snippets API',
        default_version='v1',
        description='Test description',
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ],
)

urlpatterns = [
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),

    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/routes/', include('road_routes.urls')),
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),
]
