from django.urls import path
from . import views


urlpatterns = [
    path('', views.homepage, name='homepage'),
	path('create-game/', views.create_game, name = 'create-game'),
	path('game/<uuid:match_id>/', views.game, name = 'game'),
	path('DEBUGgame', views.DEBUGgame, name = "DEBUGgame")
]
