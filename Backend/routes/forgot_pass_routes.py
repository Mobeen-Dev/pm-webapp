# routes/auth.py
from fastapi import APIRouter
from schemas.user import MessageResponse
from controllers import auth_controller
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api/auth", tags=["Auth"])


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(payload: ForgotPasswordRequest):
    return auth_controller.forgot_password(payload.email)