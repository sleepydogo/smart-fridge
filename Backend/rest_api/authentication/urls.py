from django.urls import path
from .views import *

urlpatterns = [
      path("auth/login/google/", GoogleLoginApi.as_view(), 
         name="login-with-google"),
      path('google-auth/', GoogleAuthRedirectApi.as_view(), name='google-auth'),
]