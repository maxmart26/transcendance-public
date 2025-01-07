from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _
import uuid

# Create your models here.
class Player(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=20)
    password = models.CharField(_('password'),max_length=128)
    email = models.EmailField(max_length=128)
    image_avatar = models.ImageField(upload_to='avatar/', null=True)
    nb_game_play = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])
    nb_game_win = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username