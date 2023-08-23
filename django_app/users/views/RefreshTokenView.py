from django.conf import settings
from django.http import QueryDict
from drf_social_oauth2.views import TokenView as OAuthTokenRefreshView
from rest_framework import status
from rest_framework_simplejwt.views import TokenRefreshView

from ..utils import replace_refresh_token_from_cookie


class RefreshTokenView(TokenRefreshView, OAuthTokenRefreshView):
    def post(self, request, *args, **kwargs):
        replace_refresh_token_from_cookie(request)

        is_oauth_token = False

        try:
            response = TokenRefreshView.post(self, request, *args, **kwargs)
        except Exception:
            is_oauth_token = True

        if is_oauth_token:
            if isinstance(request.data, QueryDict):
                request.data._mutable = True

            request.data.update({
                'grant_type': 'refresh_token',
                'client_id': settings.APPLICATION_GITHUB_CLIENT_ID,
                'client_secret': settings.APPLICATION_GITHUB_CLIENT_SECRET,
                'refresh_token': request.data.get('refresh'),
            })

            response = OAuthTokenRefreshView.post(self, request, *args,
                                                  **kwargs)

            if response.status_code != status.HTTP_200_OK:
                return response

            response.data = {
                'access': response.data['access_token'],
                'refresh': response.data['refresh_token'],
            }

        response.set_cookie(**{
            'key': 'refresh',
            'value': response.data['refresh'],
            'path': '/api/users/token',
            'domain': None,
            'secure': True,
            'httponly': True,
            'samesite': 'strict',
        })

        return response
