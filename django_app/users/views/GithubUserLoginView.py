from django.conf import settings
from django.http import QueryDict
from drf_social_oauth2.views import ConvertTokenView
from rest_framework.permissions import AllowAny

from ..serializers.GithubUserLoginSerializer import GithubUserLoginSerializer


class GithubUserLoginView(ConvertTokenView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        data = request.data

        serializer = GithubUserLoginSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        if isinstance(request.data, QueryDict):
            request.data._mutable = True

        request.data.update({
            'grant_type': 'convert_token',
            'backend': 'github',
            'client_id': settings.APPLICATION_GITHUB_CLIENT_ID,
            'client_secret': settings.APPLICATION_GITHUB_CLIENT_SECRET,
            'token': serializer.data.get('access_token'),
        })

        response = super().post(request, *args, **kwargs)

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
