from fastapi import APIRouter, UploadFile, File, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from app.models.bill import Bill
from app.models.user import User
from app.schemas.bill import ParsedBillRes
from app.services.extractor import extract_text
from app.services.parser import parse_bill
from app.deps import get_current_user, get_optional_user

router = APIRouter(prefix="/bills", tags=["bills"])


@router.post("/upload/energy", response_model=ParsedBillRes)
async def upload_energy_bill(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    contents = await file.read()
    raw_text = extract_text(contents, file.content_type)
    parsed = parse_bill(raw_text, bill_type="energy")
    user_id = current_user.id if current_user else None

    # If logged in, update user's energy bill fields
    if current_user and parsed.get("amount_due"):
        current_user.energy_bill_amount = parsed["amount_due"]
        if parsed.get("usage_amount"):
            current_user.energy_kwh_usage = parsed["usage_amount"]
        db.commit()

    return _save_bill(db, parsed, user_id=user_id)


@router.post("/upload/water", response_model=ParsedBillRes)
async def upload_water_bill(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    contents = await file.read()
    raw_text = extract_text(contents, file.content_type)
    parsed = parse_bill(raw_text, bill_type="water")
    user_id = current_user.id if current_user else None

    if current_user and parsed.get("amount_due"):
        current_user.water_bill_amount = parsed["amount_due"]
        if parsed.get("usage_amount"):
            current_user.water_gallons_usage = parsed["usage_amount"]
        db.commit()

    return _save_bill(db, parsed, user_id=user_id)


@router.get("/history")
def bill_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = Query(default=20, le=100),
):
    """Return the logged-in user's bill history, newest first."""
    bills = (
        db.query(Bill)
        .filter(Bill.user_id == current_user.id)
        .order_by(Bill.id.desc())
        .limit(limit)
        .all()
    )
    return {
        "bills": [
            {
                "id": b.id,
                "bill_type": b.bill_type,
                "provider_name": b.provider_name,
                "amount_due": b.amount_due,
                "usage_amount": b.usage_amount,
                "usage_unit": b.usage_unit,
                "billing_period": b.billing_period,
            }
            for b in bills
        ]
    }


def _save_bill(db: Session, parsed: dict, user_id: int | None = None) -> dict:
    bill = Bill(
        user_id=user_id,
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
