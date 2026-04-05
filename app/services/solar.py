from app.schemas.energy import SolarReq, SolarRes

# --- Constants ---
# Atlanta averages 4.5 peak sun hours per day (from NREL data)
PEAK_SUN_HOURS_PER_DAY = 4.5
DAYS_PER_MONTH         = 30

# Standard residential panel: 400W = 0.4 kW
PANEL_WATTAGE_KW = 0.4

# Industry average installed cost: $3.00 per watt = $3,000 per kW
# (after 30% federal ITC tax credit it becomes ~$2,100/kW, but we show gross first)
COST_PER_KW         = 3000.0
FEDERAL_ITC_RATE    = 0.30   # 30% federal Investment Tax Credit

# Panel efficiency degrades ~0.5% per year — used for 10yr projection
ANNUAL_DEGRADATION  = 0.005


def calculate_solar(payload: SolarReq) -> SolarRes:
    """
    Estimate solar savings from a user-selected panel count.
    The calculation compares the chosen system's generation against
    the household's current monthly usage and electricity rate.
    """

    # --- Step 1: Size the chosen system from panel count ---
    system_kw = round(payload.num_panels * PANEL_WATTAGE_KW, 2)

    # --- Step 2: Costs ---
    gross_cost = round(system_kw * COST_PER_KW, 2)
    tax_credit = round(gross_cost * FEDERAL_ITC_RATE, 2)
    upfront_cost = round(gross_cost - tax_credit, 2)

    # --- Step 3: Generation and savings ---
    monthly_kwh_generated = round(system_kw * PEAK_SUN_HOURS_PER_DAY * DAYS_PER_MONTH, 2)
    kwh_offset = min(monthly_kwh_generated, payload.monthly_kwh)
    monthly_savings = round(kwh_offset * payload.current_rate, 2)
    annual_savings = round(monthly_savings * 12, 2)

    # --- Step 4: Break-even ---
    if annual_savings > 0:
        break_even_years = round(upfront_cost / annual_savings, 1)
    else:
        break_even_years = 0.0

    # --- Step 5: 10-year earnings with degradation ---
    total_savings_10yr = 0.0
    for year in range(1, 11):
        degradation_factor = (1 - ANNUAL_DEGRADATION) ** year
        total_savings_10yr += annual_savings * degradation_factor
    roi_10yr = round(total_savings_10yr - upfront_cost, 2)
    total_savings_10yr = round(total_savings_10yr, 2)

    return SolarRes(
        num_panels=payload.num_panels,
        monthly_kwh_generated=monthly_kwh_generated,
        upfront_cost=upfront_cost,
        annual_savings=annual_savings,
        total_savings_10yr=total_savings_10yr,
        break_even_years=break_even_years,
        roi_10yr=roi_10yr,
    )
