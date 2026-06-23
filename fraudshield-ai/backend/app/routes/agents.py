from fastapi import APIRouter
from app.models import ExplainRequest
from agents.explainability_agent import explain_decision

router = APIRouter()


@router.post("/explain")
def explain(payload: ExplainRequest):
    return explain_decision(payload.model_dump())

