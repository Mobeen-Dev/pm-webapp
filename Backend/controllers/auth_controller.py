from fastapi import HTTPException, status
from schemas.user import UserCreate, UserLogin
from utils.jwt_handler import create_access_token
from passlib.context import CryptContext

# Mock "database"
mock_users = []
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
id_counter = 1

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def signup(user_data: UserCreate):
    global id_counter
    # Check if email exists
    if any(u["email"] == user_data.email for u in mock_users):
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = {
        "id": id_counter,
        "name": user_data.name,
        "email": user_data.email,
        "password": hash_password(user_data.password)
    }
    mock_users.append(new_user)
    id_counter += 1

    return {
        "message": "User created successfully",
        "user": {k: v for k, v in new_user.items() if k != "password"}
    }

def login(user_data: UserLogin):
    user = next((u for u in mock_users if u["email"] == user_data.email), None)
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["email"]})
    user_info = {k: v for k, v in user.items() if k != "password"}
    return {"token": token, "user": user_info}

def forgot_password(email: str):
    user = next((u for u in mock_users if u["email"] == email), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Normally you'd send email here
    return {"message": f"Password reset link sent to {email}"}
