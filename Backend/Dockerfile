FROM python:3.9-slim

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .  # Copie tout le contenu du projet dans /app

# Ajouter le script d'attente
COPY wait_for_db.sh /wait_for_db.sh
RUN chmod +x /wait_for_db.sh

# Commande de démarrage
CMD ["bash", "/wait_for_db.sh", "db", "python", "manage.py", "runserver", "0.0.0.0:8000"]
