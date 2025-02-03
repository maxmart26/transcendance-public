from social_core.backends.oauth import BaseOAuth2
import logging
from social_core.exceptions import AuthMissingParameter

logger = logging.getLogger(__name__)  # Pour ajouter des logs

class Intra42OAuth2(BaseOAuth2):
    """Backend pour l'authentification via 42"""
    name = 'intra42'
    AUTHORIZATION_URL = 'https://api.intra.42.fr/oauth/authorize'
    ACCESS_TOKEN_URL = 'https://api.intra.42.fr/oauth/token'
    ACCESS_TOKEN_METHOD = 'POST'
    SCOPE_SEPARATOR = ' '
    EXTRA_DATA = [
        ('expires_in', 'expires'),
        ('token_type', 'token_type', True),
    ]

    def get_user_details(self, response):
        """Récupère les détails de l'utilisateur depuis l'API"""
        return {
            'username': response.get('login'),
            'email': response.get('email') or '',
            'first_name': response.get('first_name') or '',
            'last_name': response.get('last_name') or '',
        }

    def user_data(self, access_token, *args, **kwargs):
        """Récupère les données utilisateur depuis l'API de 42"""
        logger.debug(f"Fetching user data with access_token: {access_token}")
        return self.get_json(
            'https://api.intra.42.fr/v2/me',
            headers={'Authorization': f'Bearer {access_token}'}
        )

    def auth_url(self):
        # Supprime les paramètres additionnels de redirect_uri
        redirect_uri = 'https://paul-f4br9s2:4438/auth/complete/intra42/'  # URL exacte
        url = f"{self.AUTHORIZATION_URL}?client_id={self.setting('KEY')}&redirect_uri={redirect_uri}&response_type=code"
        return url
    
    def state_token(self):
        """Force un état fixe pour le paramètre state."""
        return 'fixed_state' 
