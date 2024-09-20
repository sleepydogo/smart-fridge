

from urllib.parse import urlencode
from rest_framework import serializers
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from .mixins import PublicApiMixin, ApiErrorsMixin
from .utils import google_get_access_token, google_get_user_info
from authentication.models import User
from authentication.serializers import UserSerializer


def generate_tokens_for_user(user):
    """
    Generate access and refresh tokens for the given user
    """
    serializer = TokenObtainPairSerializer()
    token_data = serializer.get_token(user)
    access_token = token_data.access_token
    refresh_token = token_data
    return access_token, refresh_token


class GoogleLoginApi(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        login_url = f'{settings.BASE_FRONTEND_URL}/login'
    
        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        redirect_uri = f'{settings.BASE_FRONTEND_URL}/google/'
        access_token = google_get_access_token(code=code, 
                                               redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        try:
            user = User.objects.get(email=user_data['email'])
            access_token, refresh_token = generate_tokens_for_user(user)
            response_data = {
                'user': UserSerializer(user).data,
                'access_token': str(access_token),
                'refresh_token': str(refresh_token)
            }
            return Response(response_data)
        except User.DoesNotExist:
            username = user_data['email'].split('@')[0]
            first_name = user_data.get('given_name', '')
            last_name = user_data.get('family_name', '')

            user = User.objects.create(
                username=username,
                email=user_data['email'],
                first_name=first_name,
                last_name=last_name,
                registration_method='google',
                phone_no=None,
                referral=None
            )
         
            access_token, refresh_token = generate_tokens_for_user(user)
            response_data = {
                'user': UserSerializer(user).data,
                'access_token': str(access_token),
                'refresh_token': str(refresh_token)
            }
            return Response(response_data)
        
class GoogleAuthRedirectApi(PublicApiMixin, APIView):
    """
    API View that either redirects the user to Google for authentication or
    returns the URL for the frontend to handle the redirection.
    """
    
    def get_google_login_url(self):
        """
        Constructs the Google OAuth2 login URL with required parameters.
        """
        params = { 
            'client_id': settings.GOOGLE_OAUTH2_CLIENT_ID,
            'redirect_uri': f'{settings.BASE_FRONTEND_URL}',  # Debe coincidir con el URI autorizado en Google
            'response_type': 'code',
            'scope': 'openid email profile',
            'access_type': 'offline',
            'prompt': 'consent'  # Para que siempre pida el consentimiento
        }
        google_url = 'https://accounts.google.com/o/oauth2/auth?' + urlencode(params)
        return google_url

    def get(self, request, *args, **kwargs):
        # Si prefieres redirigir directamente desde el backend
        if request.GET.get('redirect', False):
            google_login_url = self.get_google_login_url()
            return redirect(google_login_url)
        
        # Si prefieres devolver la URL para que el frontend maneje la redirección
        return Response({'google_login_url': self.get_google_login_url()})