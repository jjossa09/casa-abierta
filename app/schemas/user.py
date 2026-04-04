from pydantic import BaseModel, EmailStr


class RegisterReq(BaseModel):
    email: EmailStr
    password: str
    zip_code: str
    language: str = "en"
    housing_type: str


class LoginReq(BaseModel):
    email: EmailStr
    password: str


class UserRes(BaseModel):
    id: int
    email: EmailStr
    zip_code: str
    language: str
    housing_type: str

    class Config:
        from_attributes = True
