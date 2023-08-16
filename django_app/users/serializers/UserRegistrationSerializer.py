from .CustomTokenObtainPairSerializer import CustomTokenObtainPairSerializer


class UserRegistrationSerializer(CustomTokenObtainPairSerializer):
    def validate(self, attrs):
        refresh = self.get_token(self.instance)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
