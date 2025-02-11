from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import include
from rest_framework.permissions import AllowAny
from .views import add_player, update_or_add_player,ProtectedView,oauth_callback,get_user_info,add_friend, remove_friend,leaderboard,user_logout,get_online_users
from myapp.views import get_all_players
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from myapp.views import PlayerListView


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
    path('login/', views.login, name='login'),
    path("logout/", user_logout, name="logout"),
    path('auth/complete/intra42/', oauth_callback, name='oauth_callback'),
    path('auth/', include('social_django.urls', namespace='social')),
    
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/protected/', ProtectedView.as_view(), name='protected_view'),
    path('players/', PlayerListView.as_view(), name='player-list'),

    path('user/<str:username>/', get_user_info, name='get_user_info'),
    path('leaderboard/', leaderboard, name='leaderboard'),

    path('add-friend/', add_friend, name='add_friend'),
    path('remove-friend/', remove_friend, name='remove_friend'),

    path("online-users/", get_online_users, name="online_users"),
]

# Si des fichiers statiques sont nécessaires
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
