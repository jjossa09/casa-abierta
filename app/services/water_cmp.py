from sqlalchemy.orm import Session
from app.models.provider import Provider
from app.schemas.water import WaterCompareReq


def compare_water_providers(db: Session, payload: WaterCompareReq) -> list:
    """
    Query all water providers that serve the user's ZIP code,
    then estimate what their bill would be given the user's monthly gallon usage.
    Returns a list sorted from cheapest to most expensive.
    """
    providers = (
        db.query(Provider)
        .filter(
            Provider.type == "water",
            Provider.zip_codes.contains(payload.zip_code)
        )
        .all()
    )

    results = []
    for p in providers:
        estimated_bill = round(payload.monthly_gallons * p.rate_per_unit, 2)
        results.append({
            "id":               p.id,
            "name":             p.name,
            "rate_per_gallon":  p.rate_per_unit,
            "estimated_bill":   estimated_bill,
            "avg_monthly_bill": p.avg_monthly_bill,
            "service_area":     p.service_area_label,
            "website":          p.website,
            "notes":            p.notes,
        })

    results.sort(key=lambda x: x["estimated_bill"])
    return results
