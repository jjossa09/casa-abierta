from fastapi import APIRouter, HTTPException
from app.schemas.energy import CompareReq, SolarReq, SolarRes
from app.services.energy_cmp import compare_energy_providers
from app.services.solar import calculate_solar

router = APIRouter(prefix="/energy", tags=["energy"])


@router.post("/compare")
def compare_energy(payload: CompareReq):
    try:
        results = compare_energy_providers(payload)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return {"providers": results}


@router.post("/solar", response_model=SolarRes)
def solar_estimate(payload: SolarReq):
    result = calculate_solar(payload)
    return result
