from django.urls import path
from . import views

urlpatterns = [
	path("queue", views.queue, name = "queue"),
	path("game", views.game, name = "game")
]