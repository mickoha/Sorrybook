from django.contrib import admin
from django.urls import path, include, re_path
from frontend import views

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('sorries.urls')),
    path('', include('accounts.urls')),
    re_path(r'^(?:.*)/?$', views.index)
]
