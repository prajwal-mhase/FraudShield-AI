from agents.transaction_sentinel import run as transaction_sentinel
from agents.behavioral_profiler import run as behavioral_profiler
from agents.network_analyst import run as network_analyst
from agents.explainability_agent import run as explain
from agents.escalation_orchestrator import run as escalate


def analyze_transaction(transaction: dict) -> dict:
    signals = [
        transaction_sentinel(transaction),
        behavioral_profiler(transaction),
        network_analyst(transaction),
    ]
    risk_score = round(sum(signal["score"] for signal in signals) / len(signals), 2)
    if risk_score >= 85:
        risk_level = "critical"
    elif risk_score >= 65:
        risk_level = "high"
    elif risk_score >= 40:
        risk_level = "medium"
    else:
        risk_level = "low"
    escalation = escalate(risk_score)
    return {
        "transaction_id": transaction["transaction_id"],
        "risk_score": risk_score,
        "risk_level": risk_level,
        "decision": escalation["decision"],
        "agent_signals": signals,
        "recommended_actions": escalation["actions"],
        "explanation": explain(transaction, signals, risk_score),
    }

