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

        return Response(token_serializer.validated_data,
                        status=status.HTTP_201_CREATED)
