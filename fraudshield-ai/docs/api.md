# API Contracts

## POST /transaction/analyze

Request:

```json
{
  "transaction_id": "TX-FRAUD-001",
  "account_id": "ACC-1044",
  "customer_id": "CUST-1044",
  "amount": 185000,
  "merchant": "Crypto Rapid Exchange",
  "merchant_category": "crypto",
  "country": "NG",
  "channel": "card_not_present",
  "device_id": "DEV-993",
  "ip_address": "45.14.88.1",
  "timestamp": "2026-06-23T02:14:00Z"
}
```

Response includes `risk_score`, `risk_level`, `decision`, `agent_signals`, `recommended_actions`, and `explanation`.

## GET /dashboard/stats

Returns prevented fraud, transaction count, active cases, risk trends, heatmap, and agent activity.

## POST /reports/sar

Generates a demo SAR draft from a case narrative.

