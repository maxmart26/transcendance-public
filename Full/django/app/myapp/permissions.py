from rest_framework.permissions import BasePermission

class SwaggerPermission(BasePermission):
    def has_permission(self, request, view):
        # Permet l'accès à Swagger pour tout le monde
        if view.__class__.__name__ == 'SchemaView':
            return True
        # Applique les permissions normales ailleurs
        return False
