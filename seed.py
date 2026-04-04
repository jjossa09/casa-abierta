"""Seed the database with provider data from app/data/."""
import json
from database import SessionLocal, Base, engine
from app.models.provider import Provider

Base.metadata.create_all(bind=engine)


def seed_providers():
    db = SessionLocal()
    try:
        for provider_type, filename in [
            ("energy", "energy_providers.json"),
            ("water", "water_providers.json"),
            ("phone", "phone_providers.json"),
        ]:
            with open(f"app/data/{filename}") as f:
                providers = json.load(f)
            for p in providers:
                db.add(Provider(type=provider_type, **p))
        db.commit()
        print("Seeding complete.")
    finally:
        db.close()


if __name__ == "__main__":
    seed_providers()
