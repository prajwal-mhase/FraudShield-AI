from fastapi import APIRouter
from app.models import TransactionAnalyzeRequest, TransactionAnalyzeResponse
from agents.orchestrator import analyze_transaction

router = APIRouter()


@router.post("/analyze", response_model=TransactionAnalyzeResponse)
def analyze(payload: TransactionAnalyzeRequest):
    return analyze_transaction(payload.model_dump())

