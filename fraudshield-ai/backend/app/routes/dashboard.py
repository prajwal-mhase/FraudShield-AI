from fastapi import APIRouter

router = APIRouter()


@router.get("/stats")
def stats():
    return {
        "fraud_prevented": 1845000,
        "transactions_analyzed": 10000,
        "high_risk_alerts": 37,
        "active_cases": 12,
        "agent_activity": [
            {"name": "Transaction Sentinel", "events": 10000},
            {"name": "Behavioral Profiler", "events": 8420},
            {"name": "Network Analyst", "events": 534},
            {"name": "Explainability Agent", "events": 228},
            {"name": "Escalation Orchestrator", "events": 91},
        ],
        "risk_trends": [18, 22, 19, 28, 35, 31, 44, 39, 52, 48, 61, 57],
        "heatmap": [
            {"country": "IN", "risk": 31},
            {"country": "US", "risk": 24},
            {"country": "NG", "risk": 72},
            {"country": "SG", "risk": 41},
            {"country": "AE", "risk": 63},
        ],
    }

