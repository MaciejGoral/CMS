from .models import Website, Page, Section
from rest_framework import serializers

class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Website
        fields = ('id', 'name', 'background')

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('name', 'address', 'menu_position', 'created_at', 'last_modified', 'website')

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('id', 'name', 'html_content', 'page', 'page_position', 'created_at', 'last_modified')
