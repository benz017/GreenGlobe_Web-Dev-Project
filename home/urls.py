from django.urls import path
from . import views

urlpatterns = [
    path('', views.post, name='index'),
    path('mail', views.dynamic_email, name='ack email')
    # path('data/', views.post, name='data'),
    ]