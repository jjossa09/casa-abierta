from sqlalchemy import Column, Integer, String, Float
from database import Base


class Provider(Base):
    __tablename__ = "providers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    rate = Column(Float, nullable=False)
    service_area = Column(String)
    zip_codes = Column(String)
