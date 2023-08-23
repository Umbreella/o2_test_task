from rest_framework import serializers

from ..models import User


class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)
    can_change_password = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'username', 'first_name', 'last_name', 'email', 'password',
            'can_change_password',
        )

    def get_can_change_password(self, obj):
        return obj.can_modify_password()

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        if password and instance.can_modify_password():
            instance.set_password(password)

        return super().update(instance, validated_data)
