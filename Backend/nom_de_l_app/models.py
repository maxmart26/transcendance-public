from django.db import models

class Information(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)  # 128 est recommandé pour les mots de passe hachés

    def save(self, *args, **kwargs):
        # Hacher le mot de passe avant de sauvegarder
        if not self.password.startswith('pbkdf2_'):  # Éviter de hacher plusieurs fois
            self.password = make_password(self.password)
        super().save(*args, **kwargs)