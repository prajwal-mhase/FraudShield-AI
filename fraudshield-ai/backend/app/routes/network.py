from fastapi import APIRouter
from app.demo_store import NETWORK

router = APIRouter()


@router.get("/{account_id}")
def get_network(account_id: str):
    return {"account_id": account_id, **NETWORK}

