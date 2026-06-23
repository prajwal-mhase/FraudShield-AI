# Datasets

This folder holds the synthetic data used to power FraudShield AI demos, screenshots, seeded analytics, and fraud investigation scenarios.

## What The Generator Produces

The dataset generator is designed to create realistic enough activity for a hackathon-grade fraud intelligence demo:

- `transactions.csv`: 10,000 synthetic transactions
- `customers.csv`: 1,000 synthetic customer profiles

The generated transaction set includes:

- 200 fraud-labelled transactions
- 50 synthetic fraud rings
- shared risky device identifiers
- suspicious IP subnet reuse
- high-risk merchant patterns
- remote-channel fraud behavior

## Generate The Data

Requires Python 3.11+.

```bash
python scripts/generate_mock_data.py
```

## Why This Data Exists

The synthetic dataset supports:

- dashboard metrics and trend views
- high-risk alert scenarios
- fraud ring demonstrations
- investigator workbench examples
- future database seeding and backend expansion

## Design Principles

The mock data is not random noise. It is structured to demonstrate recognizable fraud patterns:

- unusually high transaction values
- cross-border risk concentration
- device reuse across suspicious accounts
- suspicious merchant categories such as rapid value movement
- linked fraud-ring identifiers for network analysis

## Public Repo Note

This data is fully synthetic and intended for demo and development use only. It does not represent real customers, real accounts, or real financial activity.

## Related Files

- [generate_mock_data.py](</D:/Compititions - Hackathons/ET AI Hackathon 2.0/fraudshield-ai/scripts/generate_mock_data.py>)
- [schema.sql](</D:/Compititions - Hackathons/ET AI Hackathon 2.0/fraudshield-ai/database/schema.sql>)
- [seed.sql](</D:/Compititions - Hackathons/ET AI Hackathon 2.0/fraudshield-ai/database/seed.sql>)

