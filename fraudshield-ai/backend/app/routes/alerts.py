from fastapi import APIRouter
from app.demo_store import ALERTS

router = APIRouter()


@router.get("")
def list_alerts(status: str | None = None):
    if status:
        return [alert for alert in ALERTS if alert["status"] == status]
    return ALERTS

