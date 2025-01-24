from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from django.core.asgi import get_asgi_application
from django.urls import path, re_path

from myapp.game.Pong import *
from myapp.consumers import MatchManager

websocket_urlpatterns = [
    path("ws/myapp/game/", MatchManager.as_asgi()),
    re_path(r'ws/myapp/game/(?P<match_id>[0-9a-f-]+)/$', PongGame.as_asgi())
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(), # Gère les requêtes HTTP
    "websocket": AuthMiddlewareStack( # Middleware d'authentification (même sans authentification pour l'instant)
        URLRouter(
            websocket_urlpatterns
        )
    ),
})