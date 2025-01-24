import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _


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


class Player(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(_('password'), max_length=128)
    email = models.EmailField(max_length=128, unique=True)
    image_avatar = models.ImageField(upload_to='avatar/', null=True, blank=True)
    nb_game_play = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])
    nb_game_win = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Champs obligatoires pour AbstractBaseUser
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Champs pour l'authentification
    USERNAME_FIELD = 'username'  # Champ utilisé pour l'authentification
    REQUIRED_FIELDS = ['email']  # Champs nécessaires lors de la création d'un superutilisateur

    objects = PlayerManager()

    def __str__(self):
        return self.username
    
class Match(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    player1 = models.CharField(max_length=255)
    player2 = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, default='waiting')

    def __str__(self):
        return str(self.id)
