from sqlalchemy import Column, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    language = Column(String, default="en")
    housing_type = Column(String, nullable=False)
