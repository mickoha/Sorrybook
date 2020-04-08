# chat/urls.py
from django.urls import path, re_path

from . import views

from .api import ChatListView, create_chat, delete_chat

urlpatterns = [
    re_path(r'api/chat/',
            ChatListView.as_view({'get': 'retrieve'}), name='chat_list'),
    re_path(r'api/create-chat/', create_chat, name='chat_create'),
    re_path(r'api/delete-chat/(?P<pk>[^/.]+)/',
            delete_chat, name='chat_delete'),


]
