from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from database import get_db
from app.models.bill import Bill
from app.schemas.bill import ParsedBillRes
from app.services.extractor import extract_text
from app.services.parser import parse_bill

router = APIRouter(prefix="/bills", tags=["bills"])


@router.post("/upload/energy", response_model=ParsedBillRes)
async def upload_energy_bill(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    raw_text = extract_text(contents, file.content_type)
    parsed = parse_bill(raw_text, bill_type="energy")
    return _save_bill(db, parsed)


@router.post("/upload/water", response_model=ParsedBillRes)
async def upload_water_bill(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    raw_text = extract_text(contents, file.content_type)
    parsed = parse_bill(raw_text, bill_type="water")
    return _save_bill(db, parsed)


def _save_bill(db: Session, parsed: dict) -> dict:
    bill = Bill(
        bill_type=parsed["bill_type"],
        provider_name=parsed.get("provider_name"),
        account_number=parsed.get("account_number"),
        billing_period=parsed.get("billing_period"),
        usage_amount=parsed.get("usage_amount"),
        usage_unit=parsed.get("usage_unit"),
        rate_per_unit=parsed.get("rate_per_unit"),
        effective_rate=parsed.get("effective_rate"),
        amount_due=parsed.get("amount_due"),
        raw_text=parsed.get("raw_text"),
    )
    db.add(bill)
    db.commit()
    db.refresh(bill)

    return {
        "bill_id": bill.id,
        **parsed,
    }
