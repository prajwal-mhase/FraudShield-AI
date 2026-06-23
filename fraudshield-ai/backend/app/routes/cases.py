from datetime import datetime
from fastapi import APIRouter
from app.models import CaseCreateRequest
from app.demo_store import CASES

router = APIRouter()


@router.post("/create")
def create_case(payload: CaseCreateRequest):
    case = {
        "id": f"CASE-{len(CASES) + 1001}",
        "alert_id": payload.alert_id,
        "assigned_to": payload.assigned_to,
        "status": "open",
        "notes": payload.notes,
        "created_at": datetime.utcnow().isoformat(),
    }
    CASES.append(case)
    return case

