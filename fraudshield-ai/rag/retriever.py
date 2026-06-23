from pathlib import Path
import json

PROMPT = """Use retrieved compliance context to answer the analyst.
Keep the answer concise, cite internal source names, and separate evidence from recommendation."""


def retrieve(query: str, top_k: int = 3):
    store_path = Path(__file__).parent / "vector_store.json"
    if not store_path.exists():
        return []
    records = json.loads(store_path.read_text(encoding="utf-8"))
    terms = set(query.lower().split())
    ranked = []
    for record in records:
        score = sum(1 for term in terms if term in record["text"].lower())
        ranked.append((score, record))
    return [record for score, record in sorted(ranked, reverse=True)[:top_k] if score > 0]

