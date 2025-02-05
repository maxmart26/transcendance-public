from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from django.core.asgi import get_asgi_application
from django.urls import path, re_path

from myapp.consumers import MatchManager, TournamentManager

websocket_urlpatterns = [
    re_path(r'ws/game/(?P<match_id>[0-9a-f-]+)/$', MatchManager.as_asgi()),
    re_path(r'ws/tournament/(?P<tourn_id>[0-9a-f-]+)/$', TournamentManager.as_asgi())
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(), # Gère les requêtes HTTP
    "websocket": AuthMiddlewareStack( # Middleware d'authentification (même sans authentification pour l'instant)
        URLRouter(
            websocket_urlpatterns
        )
    ),
})