from django.test import TestCase
from django.urls import reverse


class PortfolioPageTests(TestCase):
    def test_home_page_loads(self):
        response = self.client.get(reverse("portfolio:home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Selected projects")

    def test_contact_form_validation(self):
        response = self.client.post(
            reverse("portfolio:home"),
            {
                "name": "User",
                "email": "user@example.com",
                "subject": "Hi",
                "message": "short",
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "at least 20 characters")
