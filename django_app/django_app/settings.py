import os
import sys
from datetime import timedelta
from pathlib import Path

from dotenv import dotenv_values

BASE_DIR = Path(__file__).resolve().parent.parent

config = {
    **dotenv_values('.env'),
    **dotenv_values('.env.local'),
    **dotenv_values('.env.development.local'),
    **dotenv_values('.env.production.local'),
    **os.environ,
}

if 'test' in sys.argv:
    config = {
        **dotenv_values('.env.test.local')
    }

SECRET_KEY = config.get('DJANGO_APP_SECRET_KEY', None)

DEBUG = int(config.get('DJANGO_APP_DEBUG', 0))

ALLOWED_HOSTS = config.get('DJANGO_APP_ALLOWED_HOSTS').split(' ')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',

    'drf_yasg',
    'corsheaders',
    'import_export',
    'leaflet',
    'rest_framework',
    'rest_framework_gis',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',

    'oauth2_provider',
    'social_django',
    'drf_social_oauth2',

    'road_routes',
    'users',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_app.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': config.get('DJANGO_APP_DATABASE_SQL_ENGINE'),
        'NAME': config.get('DJANGO_APP_DATABASE_SQL_MASTER_DATABASE'),
        'USER': config.get('DJANGO_APP_DATABASE_SQL_MASTER_USER'),
        'PASSWORD': config.get('DJANGO_APP_DATABASE_SQL_MASTER_PASSWORD'),
        'HOST': config.get('DJANGO_APP_DATABASE_SQL_MASTER_HOST'),
        'PORT': config.get('DJANGO_APP_DATABASE_SQL_MASTER_PORT'),
        'ATOMIC_REQUESTS': True,
    },
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': ''.join((
            'django.contrib.auth.password_validation.',
            'UserAttributeSimilarityValidator',
        )),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.MinimumLengthValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.CommonPasswordValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.NumericPasswordValidator'
        ),
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.User'

ACTIVATE_JWT = True

SOCIAL_AUTH_JSONFIELD_ENABLED = True

SOCIAL_AUTH_URL_NAMESPACE = 'social'

SOCIAL_AUTH_GITHUB_KEY = config.get('DJANGO_APP_SOCIAL_AUTH_GITHUB_KEY')
SOCIAL_AUTH_GITHUB_SECRET = config.get('DJANGO_APP_SOCIAL_AUTH_GITHUB_SECRET')

APPLICATION_GITHUB_CLIENT_ID = (
    config.get('DJANGO_APP_APPLICATION_GITHUB_CLIENT_ID')
)
APPLICATION_GITHUB_CLIENT_SECRET = (
    config.get('DJANGO_APP_APPLICATION_GITHUB_CLIENT_SECRET')
)

AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.google.GoogleOAuth',
    'social_core.backends.github.GithubOAuth2',
    'drf_social_oauth2.backends.DjangoOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'drf_social_oauth2.authentication.SocialAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': '',
    'AUDIENCE': None,
    'ISSUER': None,
    'JSON_ENCODER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': ''.join((
        'rest_framework_simplejwt.authentication.',
        'default_user_authentication_rule',
    )),

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),

    'TOKEN_OBTAIN_SERIALIZER': (
        'rest_framework_simplejwt.serializers.TokenObtainPairSerializer'
    ),
    'TOKEN_REFRESH_SERIALIZER': (
        'rest_framework_simplejwt.serializers.TokenRefreshSerializer'
    ),
    'TOKEN_VERIFY_SERIALIZER': (
        'rest_framework_simplejwt.serializers.TokenVerifySerializer'
    ),
    'TOKEN_BLACKLIST_SERIALIZER': (
        'rest_framework_simplejwt.serializers.TokenBlacklistSerializer'
    ),
    'SLIDING_TOKEN_OBTAIN_SERIALIZER': (
        'rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer'
    ),
    'SLIDING_TOKEN_REFRESH_SERIALIZER': (
        'rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer'
    ),
}

CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = config.get('DJANGO_APP_CSRF_TRUSTED_ORIGINS').split(' ')
CORS_ALLOWED_ORIGINS = config.get('DJANGO_APP_CORS_ALLOWED_ORIGINS').split(' ')

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'access-control-allow-credentials',
    'access-control-expose-headers',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'stripe-signature',
]
