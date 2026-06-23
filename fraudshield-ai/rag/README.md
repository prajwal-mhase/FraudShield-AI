# RAG Module

Purpose: retrieve compliance policies, internal fraud playbooks, and regulator guidance for explainability and SAR drafting.

MVP behavior:

- Ingest `.txt` and `.md` files from `rag/documents`
- Chunk by 800 characters with 120 character overlap
- Store chunk metadata in local JSON for demo
- Compatible with future Qdrant migration

Files:

- `ingest.py`: reads source documents and writes the local chunk store
- `chunking.py`: handles fixed-size overlapping chunk generation
- `retriever.py`: returns top matching chunks for analyst/compliance prompts
- `documents/`: source playbooks and guidance

Current prototype behavior:

- backend and report flows can use deterministic logic without live vector infra
- this module is ready for demoable local retrieval
- moving to Qdrant later only requires swapping the storage layer, not the prompt flow
