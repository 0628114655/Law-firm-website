from django.contrib import admin
from .models import *
# Register your models here.

   

class LegalConsultationAdmin(admin.ModelAdmin):
    list_display = ('fullName', 'numberPhone','consultationSubject')  # عرض الحقول في قائمة السجلات
    search_fields = ('fullName', 'numberPhone','consultationSubject')  # خيار 

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('fullName', 'numberPhone')  # عرض الحقول في قائمة السجلات
    search_fields = ('fullName', 'numberPhone')  # خيار 
admin.site.register(Home)
admin.site.register(Service)
admin.site.register(Question)
admin.site.register(BackgroundImage)
admin.site.register(AboutUs)
admin.site.register(CV)
admin.site.register(ContactUS)
admin.site.register(Blog)
admin.site.register(LegalConsultation, LegalConsultationAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Notification)