import csv
import random
from datetime import datetime, timedelta
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "datasets"
OUT.mkdir(exist_ok=True)

COUNTRIES = ["IN", "US", "SG", "AE", "GB", "NG"]
CHANNELS = ["upi", "netbanking", "card_present", "card_not_present", "api"]
MERCHANTS = ["Urban Grocery", "Metro Fuel", "Cloud SaaS", "Crypto Rapid Exchange", "Luxury Watches", "TravelNow"]


def generate():
    random.seed(42)
    fraud_accounts = {f"ACC-{1044 + i}" for i in range(200)}
    ring_ids = [f"RING-{i:03d}" for i in range(50)]
    with (OUT / "transactions.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "transaction_id", "account_id", "customer_id", "amount", "merchant",
            "merchant_category", "country", "channel", "device_id", "ip_address",
            "is_fraud", "ring_id", "timestamp"
        ])
        writer.writeheader()
        for i in range(10000):
            is_fraud = i < 200
            account = f"ACC-{1000 + i % 1000}"
            if is_fraud:
                account = random.choice(list(fraud_accounts))
            writer.writerow({
                "transaction_id": f"TX-{i:06d}",
                "account_id": account,
                "customer_id": f"CUST-{1000 + i % 1000}",
                "amount": round(random.uniform(50000, 250000) if is_fraud else random.uniform(80, 15000), 2),
                "merchant": "Crypto Rapid Exchange" if is_fraud and i % 3 == 0 else random.choice(MERCHANTS),
                "merchant_category": "crypto" if is_fraud and i % 3 == 0 else "retail",
                "country": random.choice(["NG", "AE", "SG"]) if is_fraud else random.choice(COUNTRIES[:5]),
                "channel": random.choice(["api", "card_not_present"]) if is_fraud else random.choice(CHANNELS),
                "device_id": "DEV-993" if is_fraud and i % 4 == 0 else f"DEV-{random.randint(100, 999)}",
                "ip_address": f"45.14.88.{random.randint(1, 240)}" if is_fraud else f"103.21.{random.randint(1,99)}.{random.randint(1,240)}",
                "is_fraud": is_fraud,
                "ring_id": random.choice(ring_ids) if is_fraud else "",
                "timestamp": (datetime.utcnow() - timedelta(minutes=i)).isoformat(),
            })

    with (OUT / "customers.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["customer_id", "avg_amount", "usual_country", "trusted_device"])
        writer.writeheader()
        for i in range(1000):
            writer.writerow({
                "customer_id": f"CUST-{1000 + i}",
                "avg_amount": round(random.uniform(1000, 12000), 2),
                "usual_country": random.choice(["IN", "US", "SG", "AE"]),
                "trusted_device": f"DEV-{random.randint(100, 999)}",
            })


if __name__ == "__main__":
    generate()
    print(f"Generated datasets in {OUT}")

