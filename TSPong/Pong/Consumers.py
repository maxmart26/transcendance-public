import uuid
from django.db import models
from django.conf import settings

class GameModel(models.Model):
    game_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    player1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='games_as_player1')
    player2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='games_as_player2')
    score_player1 = models.IntegerField(default=0)
    score_player2 = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=[('waiting', 'En attente'), ('playing', 'En cours'), ('finished', 'Terminée')], default='waiting')

    def __str__(self):
        return str(self.game_id)