import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

sys.path.append(str(Path(__file__).resolve().parents[2]))

from app.routes import auth, transactions, alerts, cases, dashboard, agents, network, reports

app = FastAPI(title="FraudShield AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(transactions.router, prefix="/transaction", tags=["transactions"])
app.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
app.include_router(cases.router, prefix="/case", tags=["cases"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
app.include_router(agents.router, prefix="/agent", tags=["agents"])
app.include_router(network.router, prefix="/network", tags=["network"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "fraudshield-ai"}
