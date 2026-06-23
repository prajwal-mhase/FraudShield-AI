PROMPT = """Generate a concise investigator explanation with top risk drivers and next best actions."""


def explain_decision(payload: dict) -> dict:
    reasons = []
    for signal in payload["signals"]:
        reasons.extend(signal["reasons"][:2])
    return {
        "transaction_id": payload["transaction_id"],
        "plain_english": "The transaction was escalated because multiple independent agents found correlated risk.",
        "top_drivers": reasons[:5],
        "counterfactual": "Risk would decrease if the transaction used a trusted device, normal amount, and no mule-ring links.",
        "next_actions": [
            "Freeze outgoing transfer for manual review",
            "Contact customer through verified channel",
            "Open fraud case and attach network graph",
        ],
    }


def run(transaction: dict, signals: list[dict], risk_score: float) -> str:
    drivers = [reason for signal in signals for reason in signal["reasons"]]
    return f"Risk score {risk_score:.0f}/100. Key drivers: " + "; ".join(drivers[:4])

