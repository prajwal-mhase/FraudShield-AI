from fastapi import APIRouter, HTTPException
from app.models import LoginRequest, LoginResponse

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    if payload.email != "analyst@fraudshield.ai" or payload.password != "demo123":
        raise HTTPException(status_code=401, detail="Invalid demo credentials")
    return {
        "access_token": "demo.jwt.token",
        "user": {"id": "USR-1", "name": "Aarav Mehta", "role": "Senior Fraud Analyst"},
    }

