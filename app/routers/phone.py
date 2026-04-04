from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from app.schemas.phone import PhoneCompareReq, PhoneRes
from app.services.phone_cmp import compare_phone_plans

router = APIRouter(prefix="/phone", tags=["phone"])


@router.post("/compare")
def compare_phone(payload: PhoneCompareReq, db: Session = Depends(get_db)):
    results = compare_phone_plans(db, payload)
    return {"plans": results}
