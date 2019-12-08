from django.shortcuts import render
from .email_form import Email
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import os
from .logo import logo_data


def post(request):
    if request.method == "POST":
        Email.name = request.POST['name']
        Email.email = request.POST['email']
        Email.contact_number = request.POST['contact_number']
        Email.message = request.POST['message']
        Email.objects.create(
            name=Email.name,
            email=Email.email,
            contact_number=Email.contact_number,
            message=Email.message
            )
        subject = Email.name + ' - ' + Email.email
        msg = 'Name: ' + Email.name + '\nEmail-ID: ' + Email.email + '\nContact Number: ' + Email.contact_number + '\n\n\n' + Email.message
        send_mail(subject, msg, settings.EMAIL_HOST_USER, [settings.EMAIL_HOST_USER], fail_silently=False)
    return render(request, 'home/index.html')


def dynamic_email(request):
    if request.method == "POST":
        Email.name = request.POST['name']
        Email.email = request.POST['email']
        subject = 'Acknowledgement mail'
        html_content = render_to_string('home/ackmail.html', {'name': Email.name, 'subject': subject})  # render with dynamic value
        text_content = strip_tags(html_content)  # Strip the html tag. So people can see the pure text at least.
        # create the email, and attach the HTML version as well.
        msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [Email.email])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return HttpResponse('Acknowledgement mail sent')


def display_text(request, cert):
    context = request.GET.get('cert', cert)
    file = open(os.path.join('.well-known/acme-challenge/', context))
    return HttpResponse(file, content_type="text/plain")
