from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = None

def get_model():
    global model
    if model is None:
        print("🔥 Loading semantic model...")
        model = SentenceTransformer("all-MiniLM-L6-v2")
    return model


def compute_semantic_similarity(text1: str, text2: str) -> float:
    model = get_model()

    embeddings = model.encode([text1, text2])
    score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

    return round(float(score) * 100, 2)