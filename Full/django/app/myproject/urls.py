from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from myapp.views import home


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),  # Route principale vers la vue `home`
]

# Si des fichiers statiques sont nécessaires
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
