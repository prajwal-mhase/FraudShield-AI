from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, str]


class TransactionAnalyzeRequest(BaseModel):
    transaction_id: str
    account_id: str
    customer_id: str
    amount: float = Field(gt=0)
    merchant: str
    merchant_category: str
    country: str
    channel: str
    device_id: str
    ip_address: str
    timestamp: str


class AgentSignal(BaseModel):
    agent: str
    score: float
    label: str
    reasons: List[str]


class TransactionAnalyzeResponse(BaseModel):
    transaction_id: str
    risk_score: float
    risk_level: str
    decision: str
    agent_signals: List[AgentSignal]
    recommended_actions: List[str]
    explanation: str


class Alert(BaseModel):
    id: str
    transaction_id: str
    account_id: str
    risk_score: float
    severity: str
    status: str
    title: str
    created_at: str


class CaseCreateRequest(BaseModel):
    alert_id: str
    assigned_to: str
    notes: Optional[str] = None


class ExplainRequest(BaseModel):
    transaction_id: str
    risk_score: float
    signals: List[AgentSignal]


class SarRequest(BaseModel):
    case_id: str
    analyst: str
    narrative: str

