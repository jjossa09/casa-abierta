from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from database import get_db
from app.schemas.bill import BillUploadRes, ParsedBillRes
from app.services.extractor import extract_text
from app.services.parser import parse_bill

router = APIRouter(prefix="/bills", tags=["bills"])


@router.post("/upload/energy", response_model=ParsedBillRes)
async def upload_energy_bill(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    raw_text = extract_text(contents, file.content_type)
    parsed = parse_bill(raw_text, bill_type="energy")
    return parsed


@router.post("/upload/water", response_model=ParsedBillRes)
async def upload_water_bill(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    raw_text = extract_text(contents, file.content_type)
    parsed = parse_bill(raw_text, bill_type="water")
    return parsed
