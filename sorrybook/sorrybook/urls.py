from django.contrib import admin
from django.urls import path, include, re_path
from frontend import views

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('sorries.urls')),
    path('', include('accounts.urls')),
    path('', include('profiles.urls')),
    re_path(r'login', views.index),
    re_path(r'register', views.index),
    re_path(r'profile/', views.index)
]
