from rest_framework import serializers
from .models import Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'username', 'email', 'nb_game_play', 'nb_game_win', 'image_avatar']
