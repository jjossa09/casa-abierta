from pydantic import BaseModel, Field, model_validator


class LocationInput(BaseModel):
    zip_code: str | None = None
    address: str | None = None
    lat: float | None = Field(default=None, ge=-90, le=90)
    lon: float | None = Field(default=None, ge=-180, le=180)

    @model_validator(mode="after")
    def validate_location(self):
        has_address = bool(self.address)
        has_zip = bool(self.zip_code)
        has_coords = self.lat is not None or self.lon is not None

        if self.lat is None and self.lon is not None:
            raise ValueError("lon requires lat")
        if self.lon is None and self.lat is not None:
            raise ValueError("lat requires lon")
        if not (has_address or has_zip or (self.lat is not None and self.lon is not None)):
            raise ValueError("Provide address, zip_code, or lat/lon")
        return self


class CompareReq(LocationInput):
    current_usage_kwh: float
    current_bill_amount: float
    current_rate_per_kwh: float


class SolarReq(LocationInput):
    monthly_kwh: float
    num_panels: int = Field(gt=0)
    current_rate: float


class SolarRes(BaseModel):
    num_panels: int
    monthly_kwh_generated: float
    upfront_cost: float
    annual_savings: float
    total_savings_10yr: float
    break_even_years: float
    roi_10yr: float
