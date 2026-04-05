from datetime import datetime, timedelta
import bcrypt
from jose import jwt
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import RegisterReq, LoginReq

SECRET_KEY = "change-me-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_user(db: Session, payload: RegisterReq) -> User:
    user = User(
        first_name=payload.first_name,
        last_name=payload.last_name,
        address=payload.address,
        email=payload.email,
        password=hash_password(payload.password),
        zip_code="",
        house_sqft=0,
        language=payload.language,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, payload: LoginReq) -> str | None:
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password):
        return None
    return create_access_token({"sub": str(user.id)})
