import re

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=True, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    def can_modify_password(self):
        return bool(re.fullmatch(r'\w+[$]\d+[$]\w+[$].+', self.password))
