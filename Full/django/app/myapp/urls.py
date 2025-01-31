from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.homepage, name='homepage'),
	path('create-game/<str:difficulty>/', views.create_game, name = 'create-game'),
	path('game/<uuid:match_id>/', views.game, name = 'game'),
]
