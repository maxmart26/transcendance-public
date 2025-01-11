# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.home, name='home'),  # Une route pour la vue "home"
#     path('receive/', views.receive_info, name='receive_info'),
#     path('send/', views.send_info, name='send_info'),
#     path('login/', views.login, name='login'),
# ]


from django.urls import path
from . import views

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
def home(request):
    return HttpResponse("Bienvenue sur la page d'accueil !")

urlpatterns = [
    path('', home, name='home'),  # Page d'accueil
    path('endpoint/', views.endpoint_view, name='endpoint'),
]
