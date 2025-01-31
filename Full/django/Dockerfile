# Utiliser l'image officielle Python
FROM python:3.10

# Installer les dépendances système nécessaires à psycopg2
RUN apt-get update && apt-get install -y \
    libpq-dev gcc && \
    apt-get clean

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier des dépendances
COPY app/requirements.txt /app/requirements.txt

# Installer les dépendances Python
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copier le reste de l'application
COPY app /app

# Exposer le port 8000 pour Django
EXPOSE 8000

# Refresh les codes js
# RUN python manage.py collectstatic --noinput

# Commande par défaut
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "myproject.asgi:application"]
