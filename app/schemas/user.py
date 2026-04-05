from pydantic import BaseModel, EmailStr


class RegisterReq(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    address: str
    language: str = "en"


class LoginReq(BaseModel):
    email: EmailStr
    password: str


class UserRes(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    address: str
    language: str

    class Config:
        from_attributes = True
