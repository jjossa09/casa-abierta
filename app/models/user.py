from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = "users"

    # --- Auth ---
    id            = Column(Integer, primary_key=True, index=True)
    email         = Column(String, unique=True, index=True, nullable=False)
    password      = Column(String, nullable=False)

    # --- Personal info ---
    first_name    = Column(String, nullable=False)
    last_name     = Column(String, nullable=False)

    # --- Location & home ---
    zip_code      = Column(String(10), nullable=False)
    house_sqft    = Column(Integer, nullable=False)
    # house_sqft is required for solar (panel count) and
    # rainwater (roof collection area) calculations.

    # --- Energy bill ---
    energy_bill_amount  = Column(Float, nullable=True)  # $ per month
    energy_kwh_usage    = Column(Float, nullable=True)  # kWh per month
    # Populated when the user uploads their electricity bill.

    # --- Water bill ---
    water_bill_amount   = Column(Float, nullable=True)  # $ per month
    water_gallons_usage = Column(Float, nullable=True)  # gallons per month
    # Populated when the user uploads their water bill.

    # --- Phone bill (manual entry) ---
    phone_bill_amount   = Column(Float, nullable=True)  # $ per month

    # --- Settings (kept from original) ---
    language      = Column(String, default="en")

    # --- Timestamps ---
    created_at    = Column(DateTime(timezone=True), server_default=func.now())
    updated_at    = Column(DateTime(timezone=True), onupdate=func.now())
