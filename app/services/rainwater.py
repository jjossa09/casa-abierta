"""Rainwater harvesting calculations."""
from app.schemas.water import WaterCompareReq, RainwaterRes

AVERAGE_RAINFALL_INCHES_PER_YEAR = 30
GALLONS_PER_SQFT_PER_INCH = 0.623
ROOF_SQFT = 1500
SYSTEM_COST = 2500


def calculate_rainwater(payload: WaterCompareReq) -> RainwaterRes:
    estimated_gallons = ROOF_SQFT * AVERAGE_RAINFALL_INCHES_PER_YEAR * GALLONS_PER_SQFT_PER_INCH

    rate_per_gallon = 0.005
    cost_offset = min(estimated_gallons, payload.monthly_gallons * 12) * rate_per_gallon

    payback_years = SYSTEM_COST / cost_offset if cost_offset > 0 else 0

    return RainwaterRes(
        estimated_gallons=round(estimated_gallons, 2),
        cost_offset=round(cost_offset, 2),
        payback_years=round(payback_years, 2),
    )
