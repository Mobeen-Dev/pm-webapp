from fastapi import APIRouter
from schemas.user import UserCreate, UserLogin, MessageResponse
from controllers import auth_controller

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/signup")
def signup(user: UserCreate):
    return auth_controller.signup(user)

@router.post("/login")
def login(user: UserLogin):
    return auth_controller.login(user)

@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(payload: dict):
    return auth_controller.forgot_password(payload["email"])
