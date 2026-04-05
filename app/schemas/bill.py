from pydantic import BaseModel


class BillUploadRes(BaseModel):
    message: str
    bill_id: int


class ParsedBillRes(BaseModel):
    bill_id: int | None = None
    bill_type: str
    provider_name: str | None
    account_number: str | None
    billing_period: str | None
    usage_amount: float | None
    usage_unit: str | None
    rate_per_unit: float | None
    effective_rate: float | None
    amount_due: float | None
    raw_text: str
