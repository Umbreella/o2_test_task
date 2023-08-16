from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from .views.CheckTokenView import CheckTokenView
from .views.UserProfileView import UserProfileView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/check/', CheckTokenView.as_view(), name='token_check'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]
