from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    iin = models.CharField(max_length=12, unique=True, null=True, blank=True)
    subject_dn = models.TextField(null=True, blank=True)

    USERNAME_FIELD = 'username'  # Keep username as primary key