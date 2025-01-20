from django.urls import path
from . import views

urlpatterns = [
	path("queue", views.search_match, name = "queue"),
	path("<int:game_id>/join", views.join_match, name = "join"),
	path("DEBUGgame", views.DEBUGgame, name = "DEBUGgame")
]