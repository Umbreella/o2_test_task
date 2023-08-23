from django.conf import settings
from django.http import QueryDict
from drf_social_oauth2.views import TokenView as OAuthTokenRefreshView
from rest_framework_simplejwt.views import TokenRefreshView

from ..utils import replace_refresh_token_from_cookie


class RefreshTokenView(TokenRefreshView, OAuthTokenRefreshView):
    def post(self, request, *args, **kwargs):
        replace_refresh_token_from_cookie(request)

        try:
            response = TokenRefreshView.post(self, request, *args, **kwargs)
        except Exception:
            pass
        else:
            return response

        if isinstance(request.data, QueryDict):
            request.data._mutable = True

        request.data.update({
            'grant_type': 'refresh_token',
            'client_id': settings.APPLICATION_GITHUB_CLIENT_ID,
            'client_secret': settings.APPLICATION_GITHUB_CLIENT_SECRET,
            'refresh_token': request.data.get('refresh'),
        })

        return OAuthTokenRefreshView.post(self, request, *args, **kwargs)
