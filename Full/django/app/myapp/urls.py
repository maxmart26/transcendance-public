from django.urls import path
from .views import hello_world, test_world

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    path('test/', test_world, name='test_world'),
]
