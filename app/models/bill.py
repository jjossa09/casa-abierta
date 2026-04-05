from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base


class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    bill_type = Column(String, nullable=False)
    provider_name = Column(String)
    account_number = Column(String)
    billing_period = Column(String)
    usage_amount = Column(Float)
    usage_unit = Column(String)
    rate_per_unit = Column(Float)
    effective_rate = Column(Float)
    amount_due = Column(Float)
    raw_text = Column(String)
