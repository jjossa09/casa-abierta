from app.schemas.water import WaterCompareReq, RainwaterRes

# --- Constants ---
# Atlanta area average annual rainfall: 50 inches/year (NOAA data)
# Monthly average: 50 / 12 = 4.17 inches/month
ATLANTA_MONTHLY_RAINFALL_INCHES = 4.17

# Standard collection formula: 1 inch of rain on 1 sq ft = 0.623 gallons
GALLONS_PER_SQFT_PER_INCH = 0.623

# Collection efficiency: ~85% of rain that hits the roof is actually captured
# (accounts for evaporation, splash loss, first-flush diverter)
COLLECTION_EFFICIENCY = 0.85

# Predetermined system: standard residential rainwater harvesting setup
# We assume a 1,200 sq ft collection roof area (typical single-story house section)
# and a 1,500 gallon storage tank
STANDARD_ROOF_SQFT   = 1200
TANK_CAPACITY_GALLONS = 1500

# System cost: installed 1,500-gallon cistern system with pump and filtration
# Range in Georgia: $2,000 - $4,000. We use the midpoint.
SYSTEM_COST = 3000.0

# Average water rate in Atlanta metro (used when we don't have their exact rate)
AVG_WATER_RATE_PER_GALLON = 0.0075


def calculate_rainwater(payload: WaterCompareReq) -> RainwaterRes:
    """
    Estimate how much water a standard rainwater harvesting system
    would collect monthly, what that offsets on the water bill,
    and how many years to break even.

    Uses predetermined system size — user does not need to input
    anything beyond what's already in WaterCompareReq.
    """

    # --- Step 1: How much rain can we collect per month? ---
    raw_collection = (
        STANDARD_ROOF_SQFT
        * ATLANTA_MONTHLY_RAINFALL_INCHES
        * GALLONS_PER_SQFT_PER_INCH
        * COLLECTION_EFFICIENCY
    )

    # Cap at tank capacity — you can only store so much at a time
    # Also cap at what the user actually uses — no point collecting more
    estimated_gallons = round(
        min(raw_collection, TANK_CAPACITY_GALLONS, payload.monthly_gallons),
        2
    )

    # --- Step 2: Cost offset ---
    # How much does collecting this water save on their bill?
    cost_offset = round(estimated_gallons * AVG_WATER_RATE_PER_GALLON, 2)

    # --- Step 3: Payback period ---
    annual_savings = cost_offset * 12
    if annual_savings > 0:
        payback_years = round(SYSTEM_COST / annual_savings, 1)
    else:
        payback_years = 0.0

    return RainwaterRes(
        estimated_gallons = estimated_gallons,
        cost_offset       = cost_offset,
        payback_years     = payback_years,
    )
