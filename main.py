from fastapi import FastAPI
from app.routers import auth, bills, energy, water, phone
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Casa Abierta API")

app.include_router(auth.router)
app.include_router(bills.router)
app.include_router(energy.router)
app.include_router(water.router)
app.include_router(phone.router)


@app.get("/")
def root():
    return {"message": "Casa Abierta API is running"}
