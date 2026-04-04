"""Compare water providers by gallons used and rate."""
from sqlalchemy.orm import Session
from app.models.provider import Provider
from app.schemas.water import WaterCompareReq


def compare_water_providers(db: Session, payload: WaterCompareReq) -> list[dict]:
    providers = db.query(Provider).filter(Provider.type == "water").all()

    results = []
    for p in providers:
        zip_codes = p.zip_codes.split(",") if p.zip_codes else []
        if payload.zip_code in zip_codes or not zip_codes:
            monthly_cost = payload.monthly_gallons * p.rate
            results.append({
                "name": p.name,
                "rate": p.rate,
                "estimated_monthly_cost": round(monthly_cost, 2),
            })

    results.sort(key=lambda x: x["estimated_monthly_cost"])
    return results
