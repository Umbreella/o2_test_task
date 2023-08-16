from django.urls import path
from rest_framework_simplejwt.views import TokenBlacklistView, TokenRefreshView

from .views.CheckTokenView import CheckTokenView
from .views.UserLoginView import UserLoginView
from .views.UserProfileView import UserProfileView
from .views.UserRegistrationView import UserRegistrationView

urlpatterns = [
    path('signin/', UserLoginView.as_view(), name='sign_in'),
    path('signup/', UserRegistrationView.as_view(), name='sign_up'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/destroy/', TokenBlacklistView.as_view(), name='token_destroy'),
    path('token/check/', CheckTokenView.as_view(), name='token_check'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]
