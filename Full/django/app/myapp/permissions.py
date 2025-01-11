from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to allow only admin users to access the route.
    """
    def has_permission(self, request, view):
        # Autorise uniquement les administrateurs à accéder
        return request.user and request.user.is_staff
