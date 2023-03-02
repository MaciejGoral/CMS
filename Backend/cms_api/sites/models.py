from django.db import models

# Create your models here.

class Website(models.Model):
    name = models.CharField(max_length=200)
    background = models.CharField(max_length=7)

    def __str__(self):
        return self.name

class Page(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    address = models.CharField(max_length=200)
    menu_position = models.IntegerField(default=0, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    website = models.ForeignKey(Website, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Section(models.Model):
    name = models.CharField(max_length=200)
    html_content = models.TextField()
    page = models.ForeignKey(Page, on_delete=models.CASCADE,blank=True, null=True)
    page_position = models.IntegerField(default=0, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
