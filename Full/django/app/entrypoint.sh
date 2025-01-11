#!/bin/bash

# Attendre que la base de données soit prête
echo "Waiting for the database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Database is ready!"

# Appliquer les migrations
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

# Collecter les fichiers statiques
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Démarrer le serveur
echo "Starting Django server..."
exec "$@"
