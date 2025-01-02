from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Une route pour la vue "home"
    path('receive/', views.receive_info, name='receive_info'),
    path('send/', views.send_info, name='send_info'),
    path('login/', views.login, name='login'),
]
