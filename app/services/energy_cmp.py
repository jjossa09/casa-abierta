from sqlalchemy.orm import Session
from app.models.provider import Provider
from app.schemas.energy import CompareReq


def compare_energy_providers(db: Session, payload: CompareReq) -> list:
    """
    Query all electricity providers that serve the user's ZIP code,
    then estimate what their bill would be at each provider's rate.
    Returns a list sorted from cheapest to most expensive.
    """
    providers = (
        db.query(Provider)
        .filter(
            Provider.type == "electricity",
            Provider.zip_codes.contains(payload.zip_code)
        )
        .all()
    )

    results = []
    for p in providers:
        estimated_bill = round(payload.current_usage_kwh * p.rate_per_unit, 2)
        results.append({
            "id":                 p.id,
            "name":               p.name,
            "rate_per_kwh":       p.rate_per_unit,
            "estimated_bill":     estimated_bill,
            "avg_monthly_bill":   p.avg_monthly_bill,
            "service_area":       p.service_area_label,
            "website":            p.website,
            "notes":              p.notes,
        })

    results.sort(key=lambda x: x["estimated_bill"])
    return results
