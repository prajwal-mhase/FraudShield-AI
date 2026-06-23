# FraudShield AI

FraudShield AI is a multi-agent fraud intelligence platform built as a hackathon-ready prototype for real-time fraud detection, behavioral anomaly analysis, fraud ring discovery, explainable decisions, investigator workflows, and compliance reporting.

It is designed to demonstrate what an enterprise fraud operations cockpit could feel like when specialist AI agents collaborate instead of producing a single opaque score.

## Why FraudShield AI

Traditional fraud systems often stop at rules, isolated alerts, or black-box model outputs. FraudShield AI is built around a different idea:

- one agent evaluates transaction-level risk
- one agent compares current activity to behavioral norms
- one agent identifies networked fraud patterns and mule-ring signals
- one agent explains the decision in investigator language
- one orchestrator turns signals into an operational action

The result is a product that feels closer to an analyst workbench than a score-only API.

## What The Prototype Includes

- Real-time transaction risk analysis
- Behavioral anomaly scoring
- Fraud ring and shared-identifier investigation views
- Explainable agent-level reasoning
- Investigator case workbench
- Suspicious Activity Report draft generation
- AI copilot experience for analyst Q and A
- Synthetic demo data and judge-friendly walkthrough
- Polished frontend with offline-safe demo fallbacks

## Product Surfaces

The frontend includes eight core views:

- Login
- Fraud Command Center
- Live Transaction Stream
- Alert Queue
- Investigator Workbench
- Fraud Ring Graph
- Compliance Report Studio
- AI Copilot

## Architecture

```mermaid
flowchart LR
  UI[React Investigator UI] --> API[FastAPI]
  API --> DB[(PostgreSQL)]
  API --> Agents[Multi-Agent Orchestrator]
  Agents --> TS[Transaction Sentinel]
  Agents --> BP[Behavioral Profiler]
  Agents --> NA[Network Analyst]
  Agents --> XA[Explainability Agent]
  Agents --> EO[Escalation Orchestrator]
  API --> RAG[Compliance RAG]
  RAG --> Q[(Qdrant or Local JSON)]
```

## Tech Stack

- Frontend: React, TypeScript, Vite, custom CSS, Lucide icons
- Backend: FastAPI, Pydantic
- Database: PostgreSQL
- Agent layer: modular Python agents, LangGraph-compatible structure
- Retrieval: local JSON-backed RAG prototype with Qdrant-ready design
- Deployment targets: Vercel, Render, Railway

## Repository Structure

```text
fraudshield-ai/
|-- frontend/              # React UI and interactive demo experience
|-- backend/               # FastAPI app, routes, models, demo store
|-- agents/                # Multi-agent fraud logic
|-- rag/                   # Compliance retrieval pipeline
|-- database/              # PostgreSQL schema and seed data
|-- datasets/              # Generated synthetic data
|-- docs/                  # Architecture, API, roadmap, demo flow
|-- scripts/               # Data generation and demo utilities
|-- deployment/            # Hosting configs
`-- README.md
```

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

### Windows Launcher

If your machine has trouble starting Vite from a path with spaces:

```bat
cd frontend
run-dev.cmd
```

### Frontend Build Check

```bash
cd frontend
npm run build
```

### Backend

Requires Python 3.11+.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Demo Mode

The frontend includes built-in mock API fallbacks for the primary demo flows. That means the UI remains usable even if the FastAPI backend is not running.

This is intentional for:

- hackathon demos
- public repo previews
- offline judging
- design-first walkthroughs

When the backend is available, the frontend can call the live API instead.

## Demo Credentials

- Email: `analyst@fraudshield.ai`
- Password: `demo123`

## API Overview

- `POST /auth/login`
- `POST /transaction/analyze`
- `GET /alerts`
- `POST /case/create`
- `GET /dashboard/stats`
- `POST /agent/explain`
- `GET /network/{account_id}`
- `POST /reports/sar`

More detail is available in [docs/api.md](</D:/Compititions - Hackathons/ET AI Hackathon 2.0/fraudshield-ai/docs/api.md>).

## Demo Walkthrough

1. Sign in through the landing screen.
2. Review the Fraud Command Center dashboard.
3. Open Live Transaction Stream and analyze a normal payment.
4. Trigger the fraud-ring transaction scenario.
5. Inspect the multi-agent decision trace.
6. Open the Fraud Ring Graph to show linked accounts, device reuse, and risky IP infrastructure.
7. Create a case in the Investigator Workbench.
8. Generate a SAR draft in Compliance Report Studio.
9. Use AI Copilot to explain why the transaction was blocked.

## Current State

This repository is a prototype, not a production banking platform.

What is production-shaped:

- service boundaries
- data model
- agent separation
- API contracts
- workflow framing
- demo UX

What is intentionally simplified:

- authentication
- persistence wiring
- model training
- graph analytics depth
- regulator integrations
- live vector database deployment

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fraudshield
JWT_SECRET=hackathon-secret
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
QDRANT_URL=http://localhost:6333
```

## Screenshots And Pitch Assets

Useful supporting docs live in `docs/`:

- `architecture.md`
- `api.md`
- `demo-flow.md`
- `project-blueprint.md`
- `roadmap.md`

