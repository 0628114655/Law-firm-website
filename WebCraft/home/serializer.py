import rest_framework
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['fullName', 'numberPhone']

    def create(self, validated_data):
        user = User.objects.get_or_create(
            username = validated_data['fullName']
        )
        profile = Profile.objects.create(
            fullName = validated_data['fullName'],
            numberPhone = validated_data.get('numberPhone'),
            user = user
        )
        return  profile

class Home_serializer(serializers.ModelSerializer):
   class Meta:
        model = Home
        fields = '__all__'

class Service_serializer(serializers.ModelSerializer):
   class Meta:
        model = Service
        fields = '__all__'

class Question_serializer(serializers.ModelSerializer):
   class Meta:
        model = Question
        fields = '__all__'

class BackgroundImages_serializer(serializers.ModelSerializer):
   class Meta:
        model = BackgroundImage
        fields = '__all__'

class AboutUs_serializer(serializers.ModelSerializer):
   class Meta:
        model = AboutUs
        fields = '__all__'
        
class CV_serializer(serializers.ModelSerializer):
   class Meta:
        model = CV
        fields = '__all__'

class ContactUS_serializer(serializers.ModelSerializer):    
     class Meta:
        model = ContactUS
        fields = '__all__'

class Blog_serializer(serializers.ModelSerializer):    
     class Meta:
        model = Blog
        fields = '__all__'

class consultation_serializer(serializers.ModelSerializer):    
     class Meta:
        model = LegalConsultation
        fields = '__all__' 

class Notification_serializer(serializers.ModelSerializer):
   class Meta:
        model = Notification
        fields = '__all__'