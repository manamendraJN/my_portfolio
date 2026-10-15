from django.contrib import admin

from .models import ContactSubmission, Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "year", "featured")
    list_filter = ("category", "featured", "year")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "role", "technologies")


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at", "is_resolved")
    list_filter = ("is_resolved", "created_at")
    search_fields = ("name", "email", "subject", "message")
