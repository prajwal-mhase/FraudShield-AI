from pathlib import Path
import json
from rag.chunking import chunk_text


def ingest_documents(source_dir: str = "documents", output_file: str = "vector_store.json"):
    base = Path(__file__).parent / source_dir
    records = []
    for path in base.glob("*.*"):
        text = path.read_text(encoding="utf-8")
        for index, chunk in enumerate(chunk_text(text)):
            records.append({"id": f"{path.stem}-{index}", "source": path.name, "text": chunk})
    (Path(__file__).parent / output_file).write_text(json.dumps(records, indent=2), encoding="utf-8")
    return {"chunks": len(records)}


if __name__ == "__main__":
    print(ingest_documents())

