# RAG Module

This module powers retrieval-augmented assistance for compliance, explainability, and Suspicious Activity Report drafting.

In the current prototype, it provides a lightweight local implementation that can later be upgraded to a production-style vector workflow without changing the surrounding product flow.

## Purpose

The RAG layer exists to help FraudShield AI:

- retrieve internal fraud playbooks
- reference compliance guidance
- ground analyst-facing explanations
- support SAR narrative generation

## How It Works

The prototype pipeline is intentionally simple and portable:

1. ingest markdown or text documents from `rag/documents`
2. split them into overlapping chunks
3. store chunk records in a local JSON file
4. retrieve relevant chunks with a lightweight matching strategy

## Files

- `ingest.py`: reads source files and builds the local chunk store
- `chunking.py`: creates overlapping text chunks
- `retriever.py`: returns top matching chunks for a given query
- `documents/`: source policy and playbook material

## Default Chunking Strategy

- chunk size: 800 characters
- overlap: 120 characters

This keeps the implementation small while still being representative of a real retrieval pipeline.

## Generate The Local Store

```bash
python rag/ingest.py
```

This writes `vector_store.json` inside the `rag/` folder when documents are available.

## Why Local JSON Instead Of A Live Vector DB

For the prototype, local storage keeps setup friction low and makes the repo easier to run in constrained environments.

The design is still compatible with a future migration to:

- Qdrant
- managed embedding services
- richer retrieval and reranking

## Current Scope

This module is intended to support:

- compliance Q and A
- evidence-backed explanations
- report drafting flows

It is not yet a full production retrieval stack with embeddings, reranking, and access controls.

## Related Files

- [fraud_playbook.md](</D:/Compititions - Hackathons/ET AI Hackathon 2.0/fraudshield-ai/rag/documents/fraud_playbook.md>)
- [reports.py](</D:/Compititions - Hackathons/ET AI Hackathon 2.0/fraudshield-ai/backend/app/routes/reports.py>)
- [agents.py](</D:/Compititions - Hackathons/ET AI Hackathon 2.0/fraudshield-ai/backend/app/routes/agents.py>)

