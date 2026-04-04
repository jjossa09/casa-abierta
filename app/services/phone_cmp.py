"""Compare phone plans by data usage and number of lines."""
from sqlalchemy.orm import Session
from app.models.provider import Provider
from app.schemas.phone import PhoneCompareReq


def compare_phone_plans(db: Session, payload: PhoneCompareReq) -> list[dict]:
    providers = db.query(Provider).filter(Provider.type == "phone").all()

    results = []
    for p in providers:
        monthly_cost = p.rate * payload.num_lines
        score = payload.monthly_gb / (monthly_cost if monthly_cost > 0 else 1)
        results.append({
            "provider": p.name,
            "monthly_cost": round(monthly_cost, 2),
            "score": round(score, 4),
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results
