from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.homepage, name='homepage'),
	path('create-game/<str:difficulty>/', views.create_game, name = 'create-game'),
	path('game/<uuid:match_id>/', views.game, name = 'game'),
	path('search-player/', views.search_player, name="search-player"),
	path('tournament/', views.tournament, name='tournament'),
	path('tournament/<uuid:tourn_id>/', views.init_tourn, name='init_tourn'),
	path('tournament/game/', views.start_tourn, name='start_tourn'),
]
