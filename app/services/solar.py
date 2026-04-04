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
    Estimate solar savings for a house based on current kWh usage,
    roof square footage, and their current electricity rate.

    Uses a predetermined 400W panel size and $3/W installed cost.
    Roof sqft caps how many panels can actually fit.
    """

    # --- Step 1: How big a system does this house need? ---
    # kWh_per_month = system_kw × peak_sun_hours × days
    # → system_kw   = monthly_kwh / (peak_sun_hours × days)
    required_system_kw = payload.monthly_kwh / (PEAK_SUN_HOURS_PER_DAY * DAYS_PER_MONTH)

    # --- Step 2: How many panels fit on the roof? ---
    # Each 400W panel takes roughly 22 sq ft of roof space
    sqft_per_panel   = 22
    max_panels       = int(payload.roof_sqft / sqft_per_panel)
    max_system_kw    = max_panels * PANEL_WATTAGE_KW

    # Use whichever is smaller: what they need vs. what fits
    system_kw        = round(min(required_system_kw, max_system_kw), 2)
    panels_installed = int(system_kw / PANEL_WATTAGE_KW)

    # --- Step 3: Costs ---
    gross_cost      = round(system_kw * 1000 * (COST_PER_KW / 1000), 2)  # $3/W
    tax_credit      = round(gross_cost * FEDERAL_ITC_RATE, 2)              # 30% ITC
    upfront_cost    = round(gross_cost - tax_credit, 2)                    # net cost to owner

    # --- Step 4: Monthly and annual savings ---
    # System generates: system_kw × peak_hours × days kWh/month
    monthly_kwh_generated = round(system_kw * PEAK_SUN_HOURS_PER_DAY * DAYS_PER_MONTH, 2)

    # Savings = kWh offset × current rate (can't save more than they currently use)
    kwh_offset      = min(monthly_kwh_generated, payload.monthly_kwh)
    monthly_savings = round(kwh_offset * payload.current_rate, 2)
    annual_savings  = round(monthly_savings * 12, 2)

    # --- Step 5: Break-even ---
    if annual_savings > 0:
        break_even_years = round(upfront_cost / annual_savings, 1)
    else:
        break_even_years = 0.0

    # --- Step 6: 10-year ROI (accounting for 0.5%/yr panel degradation) ---
    total_savings_10yr = 0.0
    for year in range(1, 11):
        degradation_factor  = (1 - ANNUAL_DEGRADATION) ** year
        total_savings_10yr += annual_savings * degradation_factor
    roi_10yr = round(total_savings_10yr - upfront_cost, 2)

    return SolarRes(
        upfront_cost      = upfront_cost,
        annual_savings    = annual_savings,
        break_even_years  = break_even_years,
        roi_10yr          = roi_10yr,
    )
