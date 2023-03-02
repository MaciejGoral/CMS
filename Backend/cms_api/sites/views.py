from django.shortcuts import render
from rest_framework import viewsets, mixins, status, pagination, generics
from .models import Website, Page, Section
from .serializers import WebsiteSerializer, PageSerializer, SectionSerializer
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, SAFE_METHODS, BasePermission
from rest_framework.decorators import action, permission_classes,api_view, authentication_classes

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class WebsiteViewSet(viewsets.ModelViewSet):
    queryset = Website.objects.all()
    serializer_class = WebsiteSerializer
    permission_classes = [IsAuthenticated|ReadOnly]
    authentication_classes = [TokenAuthentication]
    def list(self, request):
        name = request.query_params.get('name', None)
        if name is not None:
            if name=='':
                websites = Website.objects.filter(name__isnull=True)
            else:
                websites = Website.objects.filter(name=name)
            serializer = WebsiteSerializer(websites, many=True)
            return Response(serializer.data)
        else:
            websites = Website.objects.all()
            serializer = WebsiteSerializer(websites, many=True)
            return Response(serializer.data)

class PageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated|ReadOnly]
    authentication_classes = [TokenAuthentication]
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    def list(self, request):
        address = request.query_params.get('address', None)
        if address is not None:
            if address=='':
                pages = Page.objects.filter(address__isnull=True)
            else:
                pages = Page.objects.filter(address=address)
            serializer = PageSerializer(pages, many=True)
            return Response(serializer.data)
        menu_position = request.query_params.get('menu_position', None)
        if menu_position is not None:
            if menu_position=='':
                pages = Page.objects.filter(menu_position__isnull=True)
            else:
                pages = Page.objects.filter(menu_position=menu_position)
            serializer = PageSerializer(pages, many=True)
            return Response(serializer.data)
        else:
            pages = Page.objects.all()
            serializer = PageSerializer(pages, many=True)
            return Response(serializer.data)

class SectionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated|ReadOnly]
    authentication_classes = [TokenAuthentication]
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    def list(self, request):
        page = request.query_params.get('page', None)
        if page is not None:
            if page=='':
                sections = Section.objects.filter(page__isnull=True)
            else:
                sections = Section.objects.filter(page=page)
            serializer = SectionSerializer(sections, many=True)
            return Response(serializer.data)
        else:
            sections = Section.objects.all()
            serializer = SectionSerializer(sections, many=True)
            return Response(serializer.data)

# add a view to verify the token
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def verify_token(request):
    return Response(status=status.HTTP_200_OK)

    