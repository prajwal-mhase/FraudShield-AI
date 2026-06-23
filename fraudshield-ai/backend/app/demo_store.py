from datetime import datetime, timedelta

ALERTS = [
    {
        "id": "ALT-9001",
        "transaction_id": "TX-FRAUD-001",
        "account_id": "ACC-1044",
        "risk_score": 94,
        "severity": "critical",
        "status": "open",
        "title": "Unusual high-value transfer to mule-linked account",
        "created_at": (datetime.utcnow() - timedelta(minutes=7)).isoformat(),
    },
    {
        "id": "ALT-9002",
        "transaction_id": "TX-FRAUD-017",
        "account_id": "ACC-2210",
        "risk_score": 87,
        "severity": "high",
        "status": "triage",
        "title": "Velocity spike across new device and foreign IP",
        "created_at": (datetime.utcnow() - timedelta(minutes=18)).isoformat(),
    },
]

CASES = []

NETWORK = {
    "nodes": [
        {"id": "ACC-1044", "label": "Origin", "risk": 94},
        {"id": "ACC-6621", "label": "Mule A", "risk": 91},
        {"id": "ACC-7782", "label": "Mule B", "risk": 88},
        {"id": "DEV-993", "label": "Shared Device", "risk": 82},
        {"id": "IP-45.14.88.1", "label": "Risk IP", "risk": 76},
    ],
    "edges": [
        {"source": "ACC-1044", "target": "ACC-6621", "reason": "rapid transfer"},
        {"source": "ACC-6621", "target": "ACC-7782", "reason": "layering"},
        {"source": "ACC-1044", "target": "DEV-993", "reason": "device match"},
        {"source": "ACC-7782", "target": "IP-45.14.88.1", "reason": "ip reuse"},
    ],
}

