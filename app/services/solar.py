"""Solar ROI calculations."""
from app.schemas.energy import SolarReq, SolarRes

COST_PER_WATT = 3.0
PANEL_EFFICIENCY = 0.20
PEAK_SUN_HOURS = 5.0


def calculate_solar(payload: SolarReq) -> SolarRes:
    system_size_kw = (payload.monthly_kwh / 30) / PEAK_SUN_HOURS
    upfront_cost = system_size_kw * 1000 * COST_PER_WATT

    annual_kwh = payload.monthly_kwh * 12
    annual_savings = annual_kwh * payload.current_rate

    break_even_years = upfront_cost / annual_savings if annual_savings > 0 else 0
    roi_10yr = (annual_savings * 10 - upfront_cost) / upfront_cost * 100

    return SolarRes(
        upfront_cost=round(upfront_cost, 2),
        annual_savings=round(annual_savings, 2),
        break_even_years=round(break_even_years, 2),
        roi_10yr=round(roi_10yr, 2),
    )
