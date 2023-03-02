from django.db import models
from sites.models import Website
from django.contrib.auth import get_user_model

User = get_user_model()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    website = models.ForeignKey(Website, on_delete=models.CASCADE)
