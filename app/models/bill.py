from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base


class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    bill_type = Column(String, nullable=False)
    provider = Column(String)
    usage = Column(Float)
    amount_due = Column(Float)
    raw_text = Column(String)
