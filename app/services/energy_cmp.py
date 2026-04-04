"""Compare energy providers by ZIP code and rate."""
from sqlalchemy.orm import Session
from app.models.provider import Provider
from app.schemas.energy import CompareReq


def compare_energy_providers(db: Session, payload: CompareReq) -> list[dict]:
    providers = db.query(Provider).filter(Provider.type == "energy").all()

    results = []
    for p in providers:
        zip_codes = p.zip_codes.split(",") if p.zip_codes else []
        if payload.zip_code in zip_codes or not zip_codes:
            monthly_cost = payload.current_usage_kwh * p.rate
            results.append({
                "name": p.name,
                "rate": p.rate,
                "estimated_monthly_cost": round(monthly_cost, 2),
            })

    results.sort(key=lambda x: x["estimated_monthly_cost"])
    return results
