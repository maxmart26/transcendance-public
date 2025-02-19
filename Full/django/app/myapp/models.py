import uuid
from asgiref.sync import async_to_sync
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class PlayerManager(BaseUserManager):
    def create_user(self, username, password=None, email=None, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, email=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('Superuser must have is_staff=True.')
        if not extra_fields.get('is_superuser'):
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, email, **extra_fields)


def get_default_avatar():
    return "avatar/fox.png"  # Relatif à MEDIA_ROOT


class Player(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(_('password'), max_length=128)
    email = models.EmailField(max_length=128, unique=True)
    image_avatar = models.ImageField(upload_to='avatar/', default=get_default_avatar, null=True, blank=True)
    nb_game_play = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    nb_game_win = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    color = models.CharField(max_length=7, default='#ff79d1')
    is_online = models.BooleanField(default=False)  # ✅ Champ en ligne

    games_history = models.JSONField(default=dict)

    friends = models.ManyToManyField('self', symmetrical=True, blank=True)
    nb_friends = models.IntegerField(default=0)

    # Champs obligatoires pour AbstractBaseUser
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Champs pour l'authentification
    USERNAME_FIELD = 'username'  # Champ utilisé pour l'authentification
    REQUIRED_FIELDS = ['email']  # Champs nécessaires lors de la création d'un superutilisateur

    objects = PlayerManager()

    def get_avatar_url(self):
        """Retourne l'URL de l'avatar ou l'image par défaut."""
        if self.image_avatar:
            return f"{settings.MEDIA_URL}{self.image_avatar}"
        return f"{settings.MEDIA_URL}{get_default_avatar()}"

    def __str__(self):
        return self.username

    def add_friend(self, player):
        """Ajoute un ami à la liste d'amis"""
        if player != self and player not in self.friends.all():
            self.friends.add(player)
            self.nb_friends = self.friends.count()
            self.save()

    def remove_friend(self, player):
        """Supprime un ami de la liste d'amis"""
        if player in self.friends.all():
            self.friends.remove(player)
            self.nb_friends = self.friends.count()
            self.save()
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        
class Match(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    player1 = models.CharField(max_length=255, null=True, blank=True)
    player2 = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, default='waiting')
    difficulty = models.CharField(max_length=6, default='medium')

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

class Tournament(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    status = models.CharField(max_length=7, default='open')
    players = models.JSONField(default=list)
    games = models.JSONField(default=list)

    first = models.CharField(max_length=20, null=True, blank=True)
    second = models.CharField(max_length=20, null=True, blank=True)
    third = models.CharField(max_length=20, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

