import requests
from django.conf import settings
from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError


class GithubUserLoginSerializer(serializers.Serializer):
    code = serializers.CharField(write_only=True)
    access_token = serializers.CharField(read_only=True)

    def validate(self, attrs):
        data = {
            **attrs,
            'client_id': settings.SOCIAL_AUTH_GITHUB_KEY,
            'client_secret': settings.SOCIAL_AUTH_GITHUB_SECRET,
        }

        response = requests.post(**{
            'url': 'https://github.com/login/oauth/access_token',
            'headers': {
                'Accept': 'application/json',
            },
            'data': data,
        })

        if response.status_code != status.HTTP_200_OK:
            detail = {
                'code': 'Not valid value.',
            }
            raise ValidationError(detail)

        return {
            **data,
            **response.json(),
        }
