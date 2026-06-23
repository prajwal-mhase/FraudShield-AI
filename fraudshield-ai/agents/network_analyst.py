PROMPT = """You are Network Analyst. Identify mule links, shared identifiers, and fraud ring patterns."""


def run(transaction: dict) -> dict:
    score = 6
    reasons = []
    if transaction["account_id"] in {"ACC-1044", "ACC-6621", "ACC-7782"}:
        score += 55
        reasons.append("Account appears in known synthetic mule-ring cluster")
    if transaction["device_id"] == "DEV-993":
        score += 22
        reasons.append("Device reused across multiple high-risk accounts")
    if transaction["ip_address"].startswith("45.14."):
        score += 16
        reasons.append("IP subnet linked to prior suspicious activity")
    return {
        "agent": "Network Analyst",
        "score": min(score, 100),
        "label": "network_risk",
        "reasons": reasons or ["No risky network links detected"],
    }

