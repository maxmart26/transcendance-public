from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.conf.urls.static import static

# Configuration Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="Documentation interactive de l'API",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('nom_de_l_app.urls')),  # Routes de ton application
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]