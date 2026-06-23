# Datasets

Run:

```bash
python scripts/generate_mock_data.py
```

Requires Python 3.11+.

Outputs:

- `transactions.csv`: 10,000 transactions
- `customers.csv`: 1,000 behavioral profiles

These files are intended for:

- dashboard metrics bootstrapping
- fraud-case demos
- ring-detection walkthroughs
- future database seeding

Fraud design:

- 200 fraud transactions
- 50 fraud rings
- Shared risky device `DEV-993`
- Suspicious subnet `45.14.88.0/24`
- High-risk merchants and remote channels

Hackathon note:

If Python is not available on the machine, the frontend demo still works through built-in mock responses. The generated CSVs are useful when you want a fuller seeded backend or screenshots based on real files.
