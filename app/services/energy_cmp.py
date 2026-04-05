from app.schemas.energy import CompareReq
from app.services.provider_lookup import lookup_energy_providers


def compare_energy_providers(payload: CompareReq) -> list[dict]:
    providers = lookup_energy_providers(
        zip_code=payload.zip_code,
        address=payload.address,
        lat=payload.lat,
        lon=payload.lon,
    )
    results = []
    for provider in providers:
        estimated_bill = round(payload.current_usage_kwh * provider["rate"], 2)
        monthly_savings = round(payload.current_bill_amount - estimated_bill, 2)
        results.append({
            "provider_id": provider["provider_id"],
            "provider_name": provider["provider_name"],
            "rate_per_kwh": provider["rate"],
            "estimated_bill": estimated_bill,
            "current_bill": payload.current_bill_amount,
            "current_rate_per_kwh": payload.current_rate_per_kwh,
            "monthly_savings": monthly_savings,
            "annual_savings": round(monthly_savings * 12, 2),
            "service_area": provider["service_area"],
            "source": provider["source"],
            "metadata": provider["metadata"],
        })

    results.sort(key=lambda x: x["estimated_bill"])
    return results
