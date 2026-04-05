from fastapi import APIRouter, HTTPException
from app.schemas.water import WaterCompareReq, RainwaterRes
from app.services.water_cmp import compare_water_providers
from app.services.rainwater import calculate_rainwater

router = APIRouter(prefix="/water", tags=["water"])


@router.post("/compare")
def compare_water(payload: WaterCompareReq):
    try:
        results = compare_water_providers(payload)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return {"providers": results}


@router.post("/rainwater", response_model=RainwaterRes)
def rainwater_estimate(payload: WaterCompareReq):
    result = calculate_rainwater(payload)
    return result
