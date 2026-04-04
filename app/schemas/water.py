from pydantic import BaseModel


class WaterCompareReq(BaseModel):
    zip_code: str
    monthly_gallons: float


class RainwaterRes(BaseModel):
    estimated_gallons: float
    cost_offset: float
    payback_years: float
