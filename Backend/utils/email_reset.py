# utils/email_reset.py
import os
import smtplib
from email.mime.text import MIMEText
from fastapi import HTTPException
from utils.jwt_handler import create_access_token

RESET_EXP_MIN = 15
RESET_URL = "https://yourfrontend.com/reset-password"

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASS = os.getenv("SMTP_PASS")


def generate_reset_token(email: str):
    return create_access_token(
        {"sub": email},
        expires_minutes=RESET_EXP_MIN
    )


def send_reset_email(to_email: str, token: str):
    reset_link = f"{RESET_URL}?token={token}"

    subject = "Password Reset"
    body = (
        f"Click the link to reset your password (valid {RESET_EXP_MIN} mins):\n"
        f"{reset_link}"
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
        raise HTTPException(status_code=500, detail=f"Email send failed: {e}")

    return True
