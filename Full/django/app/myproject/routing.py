from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from django.core.asgi import get_asgi_application
from django.urls import path

from myapp.game.Pong import *
from myapp.consumers import GameConsumer

websocket_urlpatterns = [
    path("ws/myapp/game/state", PongGame.as_asgi()),
    path("ws/myapp/game/player_info", GameConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(), # Gère les requêtes HTTP
    "websocket": AuthMiddlewareStack( # Middleware d'authentification (même sans authentification pour l'instant)
        URLRouter(
            websocket_urlpatterns
        )
    ),
})