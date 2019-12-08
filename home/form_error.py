from django.db import models


class FormError(models.Model):
    name_error = models.CharField(max_length=100)
    email_error = models.CharField(max_length=100)
    contact_error = models.CharField(max_length=100)
    message_error = models.CharField(max_length=100)

    def __str__(self):
        return self.name_error + self.email_error + self.contact_error + self.message_error
