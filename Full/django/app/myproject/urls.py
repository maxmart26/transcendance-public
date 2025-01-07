from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import include
from rest_framework.permissions import AllowAny
from .views import add_player, update_or_add_player
from myapp.views import get_all_players
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="Documentation interactive pour l'API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@tonsite.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
    #re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/', include('myapp.urls')),
    path('add-player/', views.add_player, name='add_player'),
    path('update-player/', update_or_add_player, name='update-player'),
    path('get-all-players/', get_all_players, name='get_all_players'),

]

# Si des fichiers statiques sont nécessaires
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
