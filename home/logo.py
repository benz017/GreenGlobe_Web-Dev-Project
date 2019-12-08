from email.mime.image import MIMEImage
from django.contrib.staticfiles import finders


def logo_data():
    with open(finders.find('img/ackmail/header.jpg'), 'rb') as f:
        logo_dat = f.read()
    logo = MIMEImage(logo_dat)
    logo.add_header('Content-ID', '<logo>')
    return logo
