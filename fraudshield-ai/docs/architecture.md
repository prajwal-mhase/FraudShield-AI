# Architecture

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

Frontend responsibilities:

- Login, dashboards, live feed, cases, network visualization, reports, AI copilot

Backend responsibilities:

- API contracts, validation, agent orchestration, demo persistence, report generation

Agent responsibilities:

- Independent risk signals
- Human-readable explanations
- Escalation decisions

