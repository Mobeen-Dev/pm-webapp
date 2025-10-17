from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

class TokenResponse(BaseModel):
    token: str
    user: UserResponse

class MessageResponse(BaseModel):
    message: str
