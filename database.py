from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./casa_abierta.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def run_startup_migrations():
    with engine.begin() as conn:
        user_columns = {
            row[1] for row in conn.exec_driver_sql("PRAGMA table_info(users)")
        }
        if user_columns and "address" not in user_columns:
            conn.exec_driver_sql("ALTER TABLE users ADD COLUMN address VARCHAR")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
