from django.db import models


class Project(models.Model):
    class Category(models.TextChoices):
        FULL_STACK = "Full-Stack", "Full-Stack"
        AI = "Computer Vision & AI", "Computer Vision & AI"
        ENTERPRISE = "Enterprise / Systems", "Enterprise / Systems"
        COLLABORATION = "Collaboration", "Collaboration"

    title = models.CharField(max_length=180)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=40, choices=Category.choices)
    year = models.PositiveSmallIntegerField(default=2026)
    role = models.CharField(max_length=180)
    technologies = models.CharField(max_length=255, help_text="Comma-separated technologies")
    short_description = models.TextField()
    featured = models.BooleanField(default=False)
    live_url = models.URLField(blank=True)
    source_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-featured", "-year", "title"]

    def __str__(self) -> str:
        return self.title

    @property
    def technology_list(self):
        return [item.strip() for item in self.technologies.split(",") if item.strip()]


class ContactSubmission(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} — {self.subject}"
