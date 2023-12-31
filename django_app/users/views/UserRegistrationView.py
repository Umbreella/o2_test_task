from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers.UserProfileSerializer import UserProfileSerializer
from ..serializers.UserRegistrationSerializer import \
    UserRegistrationSerializer as RegistrationSerializer


class UserRegistrationView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserProfileSerializer

    def post(self, request, *args, **kwargs):
        data = request.data

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        token_serializer = RegistrationSerializer(user, data={
            f'{RegistrationSerializer.username_field}': user.get_username(),
            'password': user.get_username(),
        })
        token_serializer.is_valid(raise_exception=True)

        response = Response()

        response.data = token_serializer.validated_data
        response.status_code = status.HTTP_201_CREATED

        response.set_cookie(**{
            'key': 'refresh',
            'value': response.data['refresh'],
            'path': '/api/users/token/',
            'domain': None,
            'secure': True,
            'httponly': True,
            'samesite': 'strict',
        })

        return response
