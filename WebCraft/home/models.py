from django.db import models
from  django.contrib.auth.models import User
# Create your models here.


class Home(models.Model):
    title = models.CharField(max_length = 100 , default = 'll')
    content = models.TextField()
    def __str__(self):
        return self.content[0:50]
    
class Service(models.Model):
    icon = models.CharField(max_length = 100)
    color = models.CharField(max_length = 50, null = True, blank = True)
    title = models.CharField(max_length = 100)
    content = models.TextField(max_length=375)

    def __str__(self):
        return self.title
    
class Question(models.Model):
    question = models.CharField(max_length = 200)
    answer = models.TextField()

    def __str__(self):
        return self.question

class BackgroundImage(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField()

    def __str__(self):
        return f' {self.id}'  

class AboutUs(models.Model):
    title = models.CharField(max_length = 100)
    image = models.ImageField()
    text = models.TextField()
    description = models.TextField()

    def __str__(self):
        return f'{self.title}'
    
class CV (models.Model):
    content = models.JSONField()
    icon = models.CharField(max_length = 100, default = 'ABC')

    def __str__(self):
        return f'{self.content}'

class ContactUS(models.Model):
    FirstName = models.CharField(max_length = 100, null = True, blank = True)
    LastName = models.CharField(max_length = 100, null = True, blank = True)
    email = models.EmailField( null = True, blank = True)
    subject = models.CharField( null = True, blank = True)
    message = models.TextField( null = True, blank = True)


    def __str__(self):
        return f'Message from {self.FirstName} {self.LastName} about {self.subject}'
    

class Blog(models.Model):
    title = models.CharField(max_length = 100, null = True, blank = True)
    introduction = models.TextField(default = 'dd')
    content = models.TextField( null = True, blank = True)
    conclusion = models.TextField(default = 'dd')

    def __str__(self):
        return self.title
    
    
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    fullName = models.CharField(max_length = 100)
    numberPhone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self) -> str:
        return self.fullName

class  Notification (models.Model):
    date = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length = 200, null = True, blank = True)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    def __str__(self) -> str:
        return f' إشعار حول {self.subject}، موجه ل {self.user}'
    
class  LegalConsultation (models.Model):
    fullName = models.CharField(max_length = 100)
    numberPhone = models.CharField(max_length = 100)
    consultationSubject =  models.CharField(max_length = 200)
    consultationContent = models.TextField()
    paymentImg = models.ImageField(null = True, blank=True)

    def __str__(self) -> str:
        return f' طلب استشارة حول موضوع {self.consultationSubject}'


