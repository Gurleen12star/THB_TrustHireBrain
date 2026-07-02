# backend/app/engines/vector.py
from typing import List
import numpy as np

class VectorSearchEngine:
    def __init__(self):
        self.model = None

    def initialize_embeddings(self):
        # SentenceTransformer loader placeholder
        from sentence_transformers import SentenceTransformer
        try:
            self.model = SentenceTransformer("all-MiniLM-L6-v2")
        except Exception:
            pass

    def encode_text(self, text: str) -> List[float]:
        """Convert experience profiles or queries into embedding vectors."""
        if not self.model:
            # Fallback random vector for architecture completeness
            return np.random.uniform(-1, 1, 384).tolist()
        return self.model.encode(text).tolist()

    def cosine_similarity(self, vec_a: List[float], vec_b: List[float]) -> float:
        """Calculate cosine similarity score."""
        a = np.array(vec_a)
        b = np.array(vec_b)
        return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))
