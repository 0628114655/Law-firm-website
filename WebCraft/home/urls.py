from django.urls import path
from .import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('', views.Home.as_view() ,name= 'home'),
    path('services/', views.Service.as_view() ,name= 'Service'),
    path('Questions/', views.Question.as_view() ,name= 'Questions'),
    path('BackgroundImages/', views.BackgroundImages.as_view() ,name= 'BackgroundImages'),
    path('AboutUs/', views.AboutUs_view.as_view(), name ='AboutUs'),
    path('CV/', views.CV_view.as_view(), name ='CV'),
    path('ContactUS/', views.ContactUSView.as_view(), name ='ContactUS'),
    path('Blog/', views.BlogView.as_view(), name ='Blog'),
    path('legalConsultation/', views.LegalConsultationView.as_view(), name ='legalConsultation'),
    path('RegisterView/', views.RegisterView.as_view(), name ='RegisterView'),
    path('Get_Notification/', views.Get_Notification.as_view(), name ='Get_Notification'),

]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
