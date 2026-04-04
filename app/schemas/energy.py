from pydantic import BaseModel


class CompareReq(BaseModel):
    zip_code: str
    current_usage_kwh: float


class SolarReq(BaseModel):
    zip_code: str
    monthly_kwh: float
    roof_sqft: float
    current_rate: float


class SolarRes(BaseModel):
    upfront_cost: float
    annual_savings: float
    break_even_years: float
    roi_10yr: float
