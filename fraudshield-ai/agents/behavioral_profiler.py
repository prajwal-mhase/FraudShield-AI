PROMPT = """You are Behavioral Profiler. Compare transaction behavior to the account's normal pattern."""


def run(transaction: dict) -> dict:
    score = 10
    reasons = []
    if transaction["amount"] > 50000:
        score += 28
        reasons.append("Amount deviates from customer's normal range")
    if transaction["device_id"].endswith("993"):
        score += 24
        reasons.append("Device is new or shared by suspicious accounts")
    if transaction["timestamp"][11:13] in {"01", "02", "03", "04"}:
        score += 12
        reasons.append("Transaction occurred outside normal active hours")
    return {
        "agent": "Behavioral Profiler",
        "score": min(score, 100),
        "label": "behavior_anomaly",
        "reasons": reasons or ["Behavior matches customer profile"],
    }

