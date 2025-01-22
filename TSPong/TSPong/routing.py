from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from Pong.game.Pong import *

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('ws/Pong/game/', PongGame.as_asgi()),
    ])
})