from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Load embedding model (light + fast)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def chunk_text(text, chunk_size=400, overlap=50):
    words = text.split()
    chunks = []
    start = 0

    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


def build_faiss_index(chunks):
    embeddings = embedding_model.encode(chunks)
    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))

    return index, embeddings


def retrieve_relevant_chunks(query, chunks, index, k=3):
    query_embedding = embedding_model.encode([query])
    _, indices = index.search(np.array(query_embedding), k)

    return [chunks[i] for i in indices[0]]
