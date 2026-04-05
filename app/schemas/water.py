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

        if self.lat is None and self.lon is not None:
            raise ValueError("lon requires lat")
        if self.lon is None and self.lat is not None:
            raise ValueError("lat requires lon")
        if not (has_address or has_zip or (self.lat is not None and self.lon is not None)):
            raise ValueError("Provide address, zip_code, or lat/lon")
        return self


class WaterCompareReq(LocationInput):
    monthly_gallons: float
    current_bill_amount: float
    current_rate_per_gallon: float


class RainwaterRes(BaseModel):
    estimated_gallons: float
    cost_offset: float
    payback_years: float
