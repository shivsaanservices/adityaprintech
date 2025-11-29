
# Aditya Printech — Deployment Instructions

1. Copy this project folder to your machine and ensure `assets/logo.png` and `assets/aditya-printech.pdf` are present.
2. (Optional) Initialize a Git repo and push to GitHub.
3. Sign in to Vercel and create a new project (import from GitHub or upload the folder).
4. In Vercel Project Settings → Environment Variables, add:
   - SMTP_USER = your Gmail address
   - SMTP_PASS = <Gmail App Password>
   - SMTP_HOST = smtp.gmail.com
   - SMTP_PORT = 587
   - TO_EMAIL = recipient email (usually same as SMTP_USER)
5. Deploy and test the contact form. Check Vercel Function logs for errors.
