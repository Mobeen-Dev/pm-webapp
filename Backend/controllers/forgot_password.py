# forgot_password.py
import os
import smtplib
from email.mime.text import MIMEText
from fastapi import HTTPException
from utils.jwt_handler import create_access_token   # <-- Uses your existing JWT

# Config (env recommended)
RESET_TOKEN_EXPIRE_MINUTES = 15
FRONTEND_RESET_URL = "https://yourdomain.com/reset-password"

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASS = os.getenv("SMTP_PASS")


def send_reset_email(to_email: str, token: str):
    """
    Sends the password reset email
    """
    reset_link = f"{FRONTEND_RESET_URL}?token={token}"

    subject = "Password Reset Request"
    body = (
        f"Hello,\n\n"
        f"Click below to reset your password. This link is valid for {RESET_TOKEN_EXPIRE_MINUTES} minutes:\n\n"
        f"{reset_link}\n\n"
        f"If you did not request this, you can ignore this message."
    )

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASS)
            server.sendmail(SMTP_EMAIL, to_email, msg.as_string())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending email: {e}")

    return True


def generate_reset_token(email: str):
    """
    Reuse existing JWT logic for reset
    """
    return create_access_token({"sub": email}, expires_minutes=RESET_TOKEN_EXPIRE_MINUTES)
