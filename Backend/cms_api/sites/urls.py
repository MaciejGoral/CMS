from rest_framework import routers
from django.urls import include, path
from . import views

router = routers.DefaultRouter()
router.register(r'websites', views.WebsiteViewSet, basename='websites')
router.register(r'pages', views.PageViewSet, basename='pages')
router.register(r'sections', views.SectionViewSet, basename='sections')

urlpatterns = [
    path('', include(router.urls)),
    path('verify/token/', views.verify_token, name='verify_token')
]