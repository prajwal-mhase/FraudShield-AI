# API Reference

This document summarizes the primary API surface exposed by the FraudShield AI backend.

The current implementation is designed for a prototype workflow: enough structure to be buildable, demoable, and extendable without pretending to be a fully hardened banking API.

## Base URL

Local development:

```text
http://localhost:8000
```

## Authentication

### `POST /auth/login`

Authenticates the demo analyst user and returns a token-shaped response.

Example request:

```json
{
  "email": "analyst@fraudshield.ai",
  "password": "demo123"
}
```

Example response:

```json
{
  "access_token": "demo.jwt.token",
  "token_type": "bearer",
  "user": {
    "id": "USR-1",
    "name": "Aarav Mehta",
    "role": "Senior Fraud Analyst"
  }
}
```

## Transaction Analysis

### `POST /transaction/analyze`

Runs the multi-agent fraud analysis flow for a transaction.

Example request:

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

Example response:

```json
{
  "transaction_id": "TX-FRAUD-001",
  "risk_score": 88,
  "risk_level": "critical",
  "decision": "block_and_escalate",
  "agent_signals": [
    {
      "agent": "Transaction Sentinel",
      "score": 98,
      "label": "transaction_risk",
      "reasons": [
        "Amount is materially above normal threshold",
        "Remote crypto-style payment risk"
      ]
    }
  ],
  "recommended_actions": [
    "Create critical alert",
    "Open case",
    "Generate SAR draft"
  ],
  "explanation": "Risk score 88/100. Key drivers: high amount, risky channel, shared device, mule-ring account."
}
```

## Alerts

### `GET /alerts`

Returns the active fraud alert queue.

Query parameter:

- `status`: optional filter by alert status

## Cases

### `POST /case/create`

Creates an investigation case from a fraud alert.

Example request:

```json
{
  "alert_id": "ALT-9001",
  "assigned_to": "Aarav Mehta",
  "notes": "Critical demo investigation"
}
```

## Dashboard

### `GET /dashboard/stats`

Returns dashboard metrics used by the Fraud Command Center.

The response includes:

- fraud prevented
- transactions analyzed
- high-risk alerts
- active cases
- agent activity
- risk trend data
- geographic heat data

## Explainability

### `POST /agent/explain`

Returns an investigator-facing explanation for a transaction decision.

This endpoint is designed to expose explainability as a first-class product feature rather than a hidden model artifact.

## Network Analysis

### `GET /network/{account_id}`

Returns a graph-style representation of suspicious relationships around an account.

The response typically includes:

- account nodes
- mule or linked-account nodes
- shared device nodes
- risky IP nodes
- relationship edges and evidence labels

## Compliance Reports

### `POST /reports/sar`

Generates a Suspicious Activity Report draft from case context and analyst narrative.

Example request:

```json
{
  "case_id": "CASE-1001",
  "analyst": "Aarav Mehta",
  "narrative": "High-value crypto transfer linked to shared device and mule-ring cluster."
}
```

## Validation And Error Handling

The backend uses Pydantic models for request and response validation. Invalid credentials and malformed requests return standard FastAPI error responses.

## Notes

- the frontend can operate in mock-backed demo mode when the backend is unavailable
- the current API surface is intentionally prototype-scaled
- endpoint names and contracts are designed to be easy to extend into a fuller production system

