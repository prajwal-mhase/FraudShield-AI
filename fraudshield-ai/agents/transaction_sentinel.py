PROMPT = """You are Transaction Sentinel. Score transaction fraud risk from 0-100.
Consider amount, country, channel, merchant category, velocity, IP, and device trust."""


def run(transaction: dict) -> dict:
    score = 8
    reasons = []
    if transaction["amount"] > 100000:
        score += 35
        reasons.append("Amount is materially above normal retail threshold")
    if transaction["country"] in {"NG", "RU", "KP"}:
        score += 25
        reasons.append("Country has elevated historical fraud exposure")
    if transaction["channel"] in {"api", "card_not_present"}:
        score += 12
        reasons.append("Remote channel increases identity and payment risk")
    if "crypto" in transaction["merchant"].lower():
        score += 18
        reasons.append("Merchant is associated with rapid value movement")
    return {
        "agent": "Transaction Sentinel",
        "score": min(score, 100),
        "label": "transaction_risk",
        "reasons": reasons or ["Transaction is within baseline rules"],
    }

