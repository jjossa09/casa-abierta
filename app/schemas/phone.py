from pydantic import BaseModel


class PhoneCompareReq(BaseModel):
    monthly_gb: float
    num_lines: int = 1


class PhoneRes(BaseModel):
    provider: str
    monthly_cost: float
    score: float


class PhoneCompareRes(BaseModel):
    plans: list[PhoneRes]
