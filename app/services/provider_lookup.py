import os
from typing import Any

import requests
from dotenv import load_dotenv


OPENEI_UTILITY_RATES_URL = "https://api.openei.org/utility_rates"

load_dotenv()


def lookup_energy_providers(
    zip_code: str | None = None,
    address: str | None = None,
    lat: float | None = None,
    lon: float | None = None,
) -> list[dict[str, Any]]:
    """
    Look up local electric utility pricing from OpenEI's utility rates API.
    Prefer a street address or lat/lon for better utility-territory matching.
    """
    api_key = os.getenv("OPENEI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENEI_API_KEY is not configured on the backend.")

    params = {
        "version": "latest",
        "format": "json",
        "api_key": api_key,
        "sector": "Residential",
        "approved": "true",
        "is_default": "true",
        "detail": "full",
        "co_limit": 10,
        "limit": 20,
    }
    params.update(_build_location_params(zip_code=zip_code, address=address, lat=lat, lon=lon))

    try:
        response = requests.get(OPENEI_UTILITY_RATES_URL, params=params, timeout=10)
        response.raise_for_status()
    except requests.RequestException as exc:
        raise RuntimeError("Failed to reach the OpenEI utility rates API.") from exc

    data = response.json() or {}
    items = data.get("items") or []

    providers: list[dict[str, Any]] = []
    seen_ids: set[str] = set()
    location_label = _location_label(zip_code=zip_code, address=address, lat=lat, lon=lon)

    for item in items:
        provider_name = item.get("utility")
        rate = _extract_energy_rate(item)
        if not provider_name or rate is None:
            continue

        provider_id = str(item.get("label", provider_name.lower().replace(" ", "-")))
        if provider_id in seen_ids:
            continue
        seen_ids.add(provider_id)

        providers.append({
            "provider_id": provider_id,
            "provider_name": provider_name,
            "rate": rate,
            "service_area": item.get("servicearea") or location_label,
            "source": "openei",
            "metadata": {
                "label": item.get("label"),
                "rate_name": item.get("name"),
                "uri": item.get("uri"),
                "sector": item.get("sector"),
                "source_parent": item.get("sourceparent"),
                "location_match": location_label,
            },
        })

    return providers


def lookup_water_providers(
    zip_code: str | None = None,
    address: str | None = None,
    lat: float | None = None,
    lon: float | None = None,
) -> list[dict[str, Any]]:
    """
    Water utility rates do not have an equivalent OpenEI-backed national lookup
    in this project. Keep a narrow curated dataset for Atlanta-area demos.
    """
    location_key = _normalize_location_text(
        address=address,
        zip_code=zip_code,
        lat=lat,
        lon=lon,
    )
    service_area = _location_label(zip_code=zip_code, address=address, lat=lat, lon=lon)

    atlanta_area_match = (
        (zip_code or "").startswith("303")
        or "atlanta" in location_key
        or "dekalb" in location_key
        or _looks_like_atlanta_coords(lat, lon)
    )

    if not atlanta_area_match:
        return []

    return [
        {
            "provider_id": "dekalb-county-water",
            "provider_name": "DeKalb County Water",
            "rate": 0.0068,
            "service_area": service_area,
            "source": "curated",
            "metadata": {
                "note": "Curated demo data for Atlanta-area water providers.",
                "location_match": service_area,
            },
        },
        {
            "provider_id": "atlanta-watershed",
            "provider_name": "Atlanta Watershed",
            "rate": 0.0075,
            "service_area": service_area,
            "source": "curated",
            "metadata": {
                "note": "Curated demo data for Atlanta-area water providers.",
                "location_match": service_area,
            },
        },
    ]


def _build_location_params(
    zip_code: str | None = None,
    address: str | None = None,
    lat: float | None = None,
    lon: float | None = None,
) -> dict[str, Any]:
    if address:
        return {"address": address}
    if lat is not None and lon is not None:
        return {"lat": lat, "lon": lon}
    if zip_code:
        return {"address": zip_code}
    raise RuntimeError("A location is required for provider lookup.")


def _location_label(
    zip_code: str | None = None,
    address: str | None = None,
    lat: float | None = None,
    lon: float | None = None,
) -> str:
    if address:
        return address
    if lat is not None and lon is not None:
        return f"{lat},{lon}"
    if zip_code:
        return zip_code
    return "unknown"


def _normalize_location_text(
    zip_code: str | None = None,
    address: str | None = None,
    lat: float | None = None,
    lon: float | None = None,
) -> str:
    parts = [
        address or "",
        zip_code or "",
        "" if lat is None else str(lat),
        "" if lon is None else str(lon),
    ]
    return " ".join(parts).lower()


def _looks_like_atlanta_coords(lat: float | None, lon: float | None) -> bool:
    if lat is None or lon is None:
        return False
    return 33.4 <= lat <= 34.2 and -84.7 <= lon <= -84.0


def _extract_energy_rate(item: dict[str, Any]) -> float | None:
    """
    Approximate an effective residential $/kWh from OpenEI default rate data.
    For hackathon use, take the first tier of the first available energy period.
    """
    structures = item.get("energyratestructure") or []
    for period in structures:
        if not period:
            continue
        first_tier = period[0]
        base_rate = first_tier.get("rate")
        adjustment = first_tier.get("adj") or 0
        if base_rate is not None:
            return round(float(base_rate) + float(adjustment), 6)

    return None
