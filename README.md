# FraudShield AI

Enterprise multi-agent fraud intelligence MVP for the ET AI Hackathon, with a polished investigator command center and hackathon-friendly demo fallbacks.

## What This Prototype Demonstrates

- Real-time transaction fraud scoring
- Behavioral anomaly detection
- Fraud ring discovery
- Explainable AI decisions
- Investigator workbench
- Compliance/SAR report generation
- AI copilot for analysts
- Enterprise-style fraud command center UI
- Demo-safe local fallbacks when backend services are unavailable
- Demo-ready synthetic data and scripted judging flow

## Tech Stack

- Frontend: React, TypeScript, Vite, custom enterprise CSS, lucide icons
- Backend: FastAPI, Pydantic, JWT-ready structure
- Database: PostgreSQL
- AI orchestration: LangGraph-compatible agent modules
- LLM provider: OpenAI or Claude via environment variable
- Vector DB: Qdrant-ready RAG module
- Deployment: Vercel frontend, Render/Railway backend, Railway/Supabase Postgres

## MVP Build Strategy

### Category A: Must Build

- Transaction analysis API
- Dashboard metrics API
- Alerts and case APIs
- Deterministic AI agents with prompt templates
- React dashboard, alerts, live transactions, workbench, graph, reports, copilot
- PostgreSQL schema
- Synthetic dataset generator
- SAR report generator
- Demo script

### Category B: Can Simulate

- LLM output through prompt-compatible deterministic fallback
- Fraud ring graph using precomputed synthetic relationships
- Qdrant retrieval using local mock store when Qdrant is unavailable
- Real-time feed using polling or button-triggered demo analysis
- Authentication using demo JWT-compatible login response

### Category C: Future Roadmap

- Streaming transaction ingestion with Kafka
- Production graph analytics with Neo4j
- Full LangGraph state machine deployment
- Model monitoring and drift detection
- Case assignment workflows
- Regulator-specific filing integrations

## Folder Structure

```text
fraudshield-ai/
|-- frontend/              # React app and enterprise UI
|-- backend/               # FastAPI app, routes, services, models
|-- agents/                # Multi-agent fraud intelligence modules
|-- rag/                   # Compliance RAG ingestion and retrieval
|-- database/              # PostgreSQL schema and seed data
|-- datasets/              # Synthetic transactions and profiles
|-- docs/                  # Architecture, API, demo, roadmap
|-- scripts/               # Data generation and helper scripts
|-- deployment/            # Vercel, Render, Railway configs
`-- README.md
```

## Quick Start

### Frontend Demo

```bash
cd frontend
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

The frontend has built-in mock API fallbacks, so the polished demo remains clickable even when the FastAPI backend is not running. This is intentional for hackathon demos and offline judging.

### Windows Launcher

If your local path contains spaces or your shell has trouble keeping the Vite server alive:

```bat
cd frontend
run-dev.cmd
```

This starts Vite directly through Node with a fixed host and port:

- URL: `http://127.0.0.1:5173`
- Port: `5173`
- Host: `127.0.0.1`

### Build Check

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

The FastAPI backend is the primary implementation target. The frontend mock layer only exists to keep the demo usable when Python is missing or the backend is intentionally offline.

## Current Demo Status

- The upgraded React UI is the primary runnable demo.
- The FastAPI backend is fully scaffolded, but it requires a working Python installation.
- If Python is unavailable, the frontend automatically uses local demo responses for login, dashboard stats, alerts, transaction analysis, case creation, network graph, and SAR generation.

## Frontend Experience

The current UI includes:

- Radar-style landing screen
- Fraud command center dashboard
- Live transaction decision trace
- Alert queue with severity scoring
- Investigator workbench with evidence timeline
- Fraud ring graph visualization
- Compliance report studio
- AI copilot panel

## Demo Credentials

- Email: `analyst@fraudshield.ai`
- Password: `demo123`

## Core API

- `POST /auth/login`
- `POST /transaction/analyze`
- `GET /alerts`
- `POST /case/create`
- `GET /dashboard/stats`
- `POST /agent/explain`
- `GET /network/{account_id}`
- `POST /reports/sar`

## Sample Demo Flow

1. Login through the landing screen.
2. Review the fraud command center dashboard.
3. Open Live Stream and analyze the normal transaction.
4. Analyze the fraud-ring transaction.
5. Inspect the multi-agent decision trace and recommended actions.
6. Open Ring Graph to show mule-account and shared-device links.
7. Create a case in Workbench and review evidence.
8. Generate a SAR draft in Compliance.
9. Use AI Copilot to explain the decision.

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fraudshield
JWT_SECRET=hackathon-secret
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
QDRANT_URL=http://localhost:6333
```
