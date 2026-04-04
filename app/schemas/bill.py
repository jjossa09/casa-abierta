from pydantic import BaseModel


class BillUploadRes(BaseModel):
    message: str
    bill_id: int


class ParsedBillRes(BaseModel):
    bill_type: str
    provider: str | None
    usage: float | None
    amount_due: float | None
    raw_text: str
