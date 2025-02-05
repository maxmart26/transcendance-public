from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.homepage, name='homepage'),
	path('create-game/<str:difficulty>/', views.create_game, name = 'create-game'),
	path('game/<uuid:match_id>/', views.game, name = 'game'),
	path('tournament/', views.tournament, name='tournament'),
	path('init_tourn/<uuid:tourn_id>/', views.init_tourn, name='init_tourn'),
]
