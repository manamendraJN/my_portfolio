from django.contrib import messages
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse

from .forms import ContactForm
from .models import Project

PROFILE = {
    "name": "Navodya Manamendra",
    "role": "Software Engineer · Full-Stack Developer",
    "headline": "Engineering software with cinematic clarity and practical impact.",
    "intro": "I design and build thoughtful digital products across full-stack systems, AI-assisted workflows, and visual storytelling interfaces.",
    "location": "Colombo, Sri Lanka",
    "github_url": "https://github.com/manamendraJN",
    "linkedin_url": "https://www.linkedin.com/in/navodya-manamendra-35a309248/",
    "email": "navodya.manamendra@example.com",
}

ABOUT_POINTS = [
    "Editorial design language inspired by premium architecture and digital storytelling websites.",
    "Production-minded engineering decisions emphasizing maintainability, accessibility, and performance.",
    "Strong interest in computer vision, intelligent systems, and practical business software delivery.",
]

SKILL_GROUPS = [
    ("Languages", ["Python", "JavaScript", "TypeScript", "Java", "PHP"]),
    ("Frontend", ["HTML5", "CSS3", "Django Templates", "GSAP", "Lenis"]),
    ("Backend", ["Django", "REST APIs", "Node.js", "Express", "Spring Boot"]),
    ("Data & AI", ["SQLite", "PostgreSQL", "OpenCV", "MediaPipe", "EfficientNet-B3"]),
    ("Tooling", ["Git", "Docker", "GitHub Actions", "Figma", "Postman"]),
]

TIMELINE = [
    {
        "title": "Broadcast Ad Insertion & Playout Operator",
        "organization": "Dialog Axiata PLC",
        "period": "2026 – Present",
        "description": "Handled mission-critical playout operations, ad insertion workflows, and reliability checks for broadcast systems.",
    },
    {
        "title": "Full Stack Engineer Intern",
        "organization": "Department of Agrarian Development",
        "period": "2025 – 2026",
        "description": "Built internal workflow software, strengthened data handling flows, and implemented practical UI features for stakeholders.",
    },
]

FALLBACK_PROJECTS = [
    {
        "title": "Warehouse Management System",
        "slug": "warehouse-management-system",
        "category": "Enterprise / Systems",
        "year": 2026,
        "role": "Full-Stack Engineer",
        "short_description": "Client-facing enterprise platform for inventory, staffing, and dispatch workflow orchestration.",
        "technologies": "MongoDB, Express, React, Node.js, JWT",
        "featured": True,
        "live_url": "",
        "source_url": "https://github.com/Shiranakther/Warehouse_Management_Syatem",
        "image_url": "",
    },
    {
        "title": "IssueSync Tracker",
        "slug": "issuesync-tracker",
        "category": "Full-Stack",
        "year": 2026,
        "role": "Product Engineer",
        "short_description": "Task and issue workflow platform with clean triage, status control, and lightweight team collaboration.",
        "technologies": "React, Node.js, Express, MongoDB, Netlify, Render",
        "featured": True,
        "live_url": "https://issuesync.netlify.app/",
        "source_url": "https://github.com/manamendraJN/issue-tracker",
        "image_url": "",
    },
    {
        "title": "HandGestureControl",
        "slug": "hand-gesture-control",
        "category": "Computer Vision & AI",
        "year": 2026,
        "role": "Computer Vision Engineer",
        "short_description": "Touchless interaction system using webcam landmarks and gesture-based operating system control.",
        "technologies": "Python, OpenCV, MediaPipe, PyAutoGUI",
        "featured": True,
        "live_url": "",
        "source_url": "https://github.com/manamendraJN/HandGestureControl",
        "image_url": "",
    },
]


def _project_to_dict(project: Project):
    return {
        "title": project.title,
        "slug": project.slug,
        "category": project.category,
        "year": project.year,
        "role": project.role,
        "short_description": project.short_description,
        "technologies": project.technologies,
        "featured": project.featured,
        "live_url": project.live_url,
        "source_url": project.source_url,
        "image_url": project.image_url,
    }


def _all_projects():
    projects = [_project_to_dict(project) for project in Project.objects.all()]
    return projects or FALLBACK_PROJECTS


def home(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Thanks for your message — I will get back to you soon.")
            return redirect(f"{reverse('portfolio:home')}#contact")
        messages.error(request, "Please correct the highlighted fields and try again.")
    else:
        form = ContactForm()

    projects = _all_projects()
    featured_project = next((project for project in projects if project.get("featured")), projects[0] if projects else None)

    return render(
        request,
        "portfolio/home.html",
        {
            "profile": PROFILE,
            "about_points": ABOUT_POINTS,
            "projects": projects,
            "featured_project": featured_project,
            "skill_groups": SKILL_GROUPS,
            "timeline": TIMELINE,
            "form": form,
            "year": 2026,
            "reference_accessible": False,
        },
    )


def project_detail(request: HttpRequest, slug: str) -> HttpResponse:
    projects = _all_projects()
    project = next((item for item in projects if item["slug"] == slug), None)
    if not project:
        raise Http404("Project not found")

    return render(
        request,
        "portfolio/project_detail.html",
        {
            "project": project,
            "profile": PROFILE,
            "year": 2026,
        },
    )
