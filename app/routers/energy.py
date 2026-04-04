from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from app.schemas.energy import CompareReq, SolarReq, SolarRes
from app.services.energy_cmp import compare_energy_providers
from app.services.solar import calculate_solar

router = APIRouter(prefix="/energy", tags=["energy"])


@router.post("/compare")
def compare_energy(payload: CompareReq, db: Session = Depends(get_db)):
    results = compare_energy_providers(db, payload)
    return {"providers": results}


@router.post("/solar", response_model=SolarRes)
def solar_estimate(payload: SolarReq):
    result = calculate_solar(payload)
    return result
