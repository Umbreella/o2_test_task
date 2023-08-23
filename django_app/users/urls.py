from django.urls import path

from .views.CheckTokenView import CheckTokenView
from .views.DestroyTokenView import DestroyTokenView
from .views.GithubUserLoginView import GithubUserLoginView
from .views.RefreshTokenView import RefreshTokenView
from .views.UserLoginView import UserLoginView
from .views.UserProfileView import UserProfileView
from .views.UserRegistrationView import UserRegistrationView

urlpatterns = [
    path('signin/', UserLoginView.as_view(), name='sign_in'),
    path('signup/', UserRegistrationView.as_view(), name='sign_up'),
    path('signin/github/', GithubUserLoginView.as_view(),
         name='sign_in_github'),

    path('token/check/', CheckTokenView.as_view(), name='token_check'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('token/destroy/', DestroyTokenView.as_view(), name='token_destroy'),

    path('profile/', UserProfileView.as_view(), name='user_profile'),
]
