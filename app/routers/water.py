from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from app.schemas.water import WaterCompareReq, RainwaterRes
from app.services.water_cmp import compare_water_providers
from app.services.rainwater import calculate_rainwater

router = APIRouter(prefix="/water", tags=["water"])


@router.post("/compare")
def compare_water(payload: WaterCompareReq, db: Session = Depends(get_db)):
    results = compare_water_providers(db, payload)
    return {"providers": results}


@router.post("/rainwater", response_model=RainwaterRes)
def rainwater_estimate(payload: WaterCompareReq):
    result = calculate_rainwater(payload)
    return result
