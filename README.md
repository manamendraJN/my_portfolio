# Premium Cinematic Portfolio (Django)

A production-minded personal portfolio built with **Django templates**, **GSAP**, **ScrollTrigger**, and **Lenis**. The project focuses on cinematic storytelling, editorial typography, and maintainable server-rendered architecture.

## Reference analysis note

The requested reference site (`https://www.era-residence.com/`) could not be accessed from this environment (DNS/host lookup failure), so implementation decisions were based only on verifiable in-repo constraints and the provided creative direction.

## Stack

- Python 3.12+
- Django 5.1
- HTML5 + modern CSS
- Vanilla JavaScript
- GSAP + ScrollTrigger
- Lenis smooth-scroll integration

## Project structure

- `/config` — Django project settings and global routing
- `/portfolio` — models, admin, form handling, page views, app routes, tests
- `/templates` — base template, home page, project detail page
- `/static/css/styles.css` — design system and responsive styling
- `/static/js/main.js` — GSAP/ScrollTrigger/Lenis motion system

## Features delivered

- Cinematic hero and typography-led section flow
- About, projects, featured storytelling, skills, experience/process, contact, footer sections
- Project detail route: `/projects/<slug>/`
- Functional contact form with server-side validation and success/error feedback
- Models and admin setup for projects and contact submissions
- Environment-driven Django settings (`DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS`)
- Reduced-motion support and animation fallbacks

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open: `http://127.0.0.1:8000/`

## Useful commands

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py test
python manage.py check
```

## Production notes

- Set `DJANGO_DEBUG=False`
- Provide secure `DJANGO_SECRET_KEY`
- Set `DJANGO_ALLOWED_HOSTS` and `DJANGO_CSRF_TRUSTED_ORIGINS`
- Collect static assets:

```bash
python manage.py collectstatic --noinput
```

- Serve `/staticfiles` with your web server or object storage/CDN.

## What remains external

- Replace placeholder email and optional CV link with real contact assets
- Add project imagery and optimized responsive image sources
- Configure deployment platform specifics (Gunicorn/Uvicorn, reverse proxy, TLS, caching)
