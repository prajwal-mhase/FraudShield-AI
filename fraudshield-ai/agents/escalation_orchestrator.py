PROMPT = """You are Escalation Orchestrator. Decide approve, step-up, hold, or block."""


def run(risk_score: float) -> dict:
    if risk_score >= 85:
        return {"decision": "block_and_escalate", "actions": ["Create critical alert", "Open case", "Generate SAR draft"]}
    if risk_score >= 65:
        return {"decision": "hold_for_review", "actions": ["Create high-risk alert", "Request analyst review"]}
    if risk_score >= 40:
        return {"decision": "step_up_auth", "actions": ["Require MFA", "Monitor account for 24h"]}
    return {"decision": "approve", "actions": ["Log decision"]}

