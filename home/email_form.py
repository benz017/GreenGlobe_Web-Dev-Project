from django import forms
from .validators import validate_email, validate_name
from django.db import models


class Email(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField(max_length=250)
    contact_number = models.CharField(max_length=15)
    message = models.CharField(max_length=1000)

    def __str__(self):
        return self.name + self.email


class Form(forms.ModelForm):
    class Meta:
        model = Email
        fields = ["name", "email", "contact_number", "message"]

