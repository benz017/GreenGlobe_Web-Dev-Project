from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
import string
import re


def validate_email(value):
    global error_mail
    email_pattern = re.match(r'\b[\w.-]+@[\w.-]+.\w{2,4}\b', value)
    if email_pattern:
        print(email_pattern.groups())
    else:
        error_mail = "* Enter Valid Email-ID"
        raise ValidationError(error_mail)
    return value


def validate_name(value):
    global error_name
    invalidchar = set(string.punctuation)
    if any(char in invalidchar for char in value):
        error_name = "* Enter Valid Name"
        raise ValidationError(error_name)
    return value
