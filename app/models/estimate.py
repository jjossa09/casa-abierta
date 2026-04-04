from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base


class Estimate(Base):
    __tablename__ = "estimates"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String, nullable=False)
    upfront_cost = Column(Float)
    savings = Column(Float)
    break_even = Column(Float)
    roi_10yr = Column(Float)
