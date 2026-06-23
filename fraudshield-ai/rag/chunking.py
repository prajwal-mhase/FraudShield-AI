def chunk_text(text: str, size: int = 800, overlap: int = 120) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        chunks.append(text[start:start + size].strip())
        start += size - overlap
    return [chunk for chunk in chunks if chunk]

