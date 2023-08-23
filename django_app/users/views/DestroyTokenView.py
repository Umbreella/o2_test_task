from django.conf import settings
from django.http import QueryDict
from drf_social_oauth2.views import RevokeTokenView
from rest_framework import status
from rest_framework_simplejwt.views import TokenBlacklistView

from ..utils import replace_refresh_token_from_cookie


class DestroyTokenView(TokenBlacklistView, RevokeTokenView):
    def post(self, request, *args, **kwargs):
        replace_refresh_token_from_cookie(request)

        is_oauth_token = False

        try:
            response = TokenBlacklistView.post(self, request, *args, **kwargs)
        except Exception:
            is_oauth_token = True

        if not is_oauth_token:
            response.status_code = status.HTTP_204_NO_CONTENT
        else:
            if isinstance(request.data, QueryDict):
                request.data._mutable = True

            request.data.update({
                'client_id': settings.APPLICATION_GITHUB_CLIENT_ID,
                'client_secret': settings.APPLICATION_GITHUB_CLIENT_SECRET,
                'token': request.data.get('refresh'),
            })

            response = RevokeTokenView.post(self, request, *args, **kwargs)

            if response.status_code != status.HTTP_204_NO_CONTENT:
                return response

        response.delete_cookie(**{
            'key': 'refresh',
            'path': '/api/users/token',
            'domain': None,
            'samesite': 'strict',
        })

        return response
