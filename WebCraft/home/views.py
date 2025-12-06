from django.shortcuts import  get_object_or_404
from .serializer import *
from rest_framework import generics
from rest_framework import mixins
from .models import *
from rest_framework.response import Response
from django.db.models import Count
from django.db.models import F
from .serializer import RegisterSerializer
from django.contrib.auth.models import User



# Create your views here.
class Home(generics.ListCreateAPIView):
    serializer_class = Home_serializer
    queryset = Home.objects.all()
    
class Service(generics.ListCreateAPIView):
    serializer_class = Service_serializer
    queryset = Service.objects.all()

class Question(generics.ListCreateAPIView):
    serializer_class = Question_serializer
    queryset = Question.objects.all()

class BackgroundImages(generics.RetrieveAPIView):
    serializer_class = BackgroundImages_serializer
    queryset = BackgroundImage.objects.all()
    
    def get(self, request, *args, **kwargs):
        img = BackgroundImage.objects.order_by('?').first()
        serializer = self.get_serializer(img)
        return Response({'img' : serializer.data})

class AboutUs_view(generics.ListCreateAPIView):
    serializer_class = AboutUs_serializer
    queryset = AboutUs.objects.all()

class CV_view(generics.ListCreateAPIView):
    serializer_class = CV_serializer
    queryset = CV.objects.all()

class ContactUSView(generics.CreateAPIView):
    serializer_class = ContactUS_serializer
    queryset = ContactUS.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class BlogView(generics.ListCreateAPIView):
    serializer_class = Blog_serializer
    queryset = Blog.objects.all()

class LegalConsultationView(generics.CreateAPIView):
    serializer_class = consultation_serializer
    queryset = LegalConsultation.objects.all()

class RegisterView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = RegisterSerializer

class Get_Notification(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = Notification_serializer

    def get(self, request, *args, **kwargs):
        user = request.user
        notification = Notification.objects.filter(user = user)
        serializer = self.get_serializer(notification)
        return Response({'notification' : serializer.data})
