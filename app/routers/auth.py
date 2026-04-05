from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from app.schemas.user import RegisterReq, LoginReq, UserRes
from app.services import auth as auth_service
from app.models.user import User
from app.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRes)
def register(payload: RegisterReq, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = auth_service.create_user(db, payload)
    return user


@router.post("/login")
def login(payload: LoginReq, db: Session = Depends(get_db)):
    token = auth_service.authenticate_user(db, payload)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = db.query(User).filter(User.email == payload.email).first()
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "address": user.address,
            "language": user.language,
        },
    }


@router.get("/me", response_model=UserRes)
def get_me(current_user: User = Depends(get_current_user)):
    """Return the currently authenticated user's profile."""
    return current_user
