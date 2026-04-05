from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import app.models
from database import Base, engine, run_startup_migrations

load_dotenv()

from app.routers import auth, bills, energy, water, phone

Base.metadata.create_all(bind=engine)
run_startup_migrations()

app = FastAPI(title="Casa Abierta API")

# --- CORS ---
# Allows the React frontend (Vite default port 5173) to call this API.
# In production this would be locked to the real domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(bills.router)
app.include_router(energy.router)
app.include_router(water.router)
app.include_router(phone.router)


@app.get("/")
def root():
    return {"message": "Casa Abierta API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}
