from datetime import datetime
from fastapi import APIRouter
from app.models import SarRequest

router = APIRouter()


@router.post("/sar")
def generate_sar(payload: SarRequest):
    return {
        "report_id": f"SAR-{payload.case_id}",
        "generated_at": datetime.utcnow().isoformat(),
        "status": "draft",
        "sections": {
            "summary": "Suspicious activity detected by multi-agent analysis.",
            "narrative": payload.narrative,
            "recommended_filing": "File SAR within internal compliance SLA.",
            "analyst": payload.analyst,
        },
    }

