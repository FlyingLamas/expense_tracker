"""
URL configuration for expense_tracker_API project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("expense_tracker_app.api.urls")),
    path("account/", include("user_app.api.urls")),
    
    # With following line included we are able to login and logout in browsable API
    # http://127.0.0.1:8000/api-auth/login/?next=/expense/monthly-report/
    # This is how the url will appear
    
    # Following url is only for browsable API, provided by DRF, as a web UI
    # It is only for login and logout there.
    # To be used only in development and would be removed in production.
    path('api-auth/', include('rest_framework.urls')),
    
    # drf spectacular paths - only to be added in main projects urls.py file.
    path("api/schema/", SpectacularAPIView.as_view(), name ="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name = "schema"), name = "swagger-ui"),

]
