from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.services.extraction.skill_extractor import extract_skills

model = SentenceTransformer("all-MiniLM-L6-v2")

def split_projects(project_text: str) -> list:
    chunks = [chunk.strip() for chunk in project_text.split(".") if chunk.strip()]
    return chunks if chunks else [project_text]

def semantic_project_similarity(project_chunks: list, jd_text: str) -> float:
    if not project_chunks:
        return 0.0

    scores = []

    # Use only first important part of JD for stronger semantic comparison
    jd_key = jd_text[:300]

    for chunk in project_chunks:
        embeddings = model.encode([chunk, jd_key])
        score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
        scores.append(float(score) * 100)

    return round(max(scores), 2) if scores else 0.0

def project_skill_overlap(project_text: str, jd_text: str) -> float:
    project_skills = set(extract_skills(project_text))
    jd_skills = set(extract_skills(jd_text))

    # Core skills get higher weight
    CORE_SKILLS = {"langchain", "llm", "fastapi", "rag", "python"}

    weighted_match = 0
    total_weight = 0

    for skill in jd_skills:
        weight = 2 if skill in CORE_SKILLS else 1
        total_weight += weight

        if skill in project_skills:
            weighted_match += weight

    if total_weight == 0:
        return 0.0

    return round((weighted_match / total_weight) * 100, 2)

def compute_project_relevance(project_text: str, jd_text: str) -> dict:
    if not project_text.strip():
        return {
            "project_relevance_score": 0.0,
            "project_skill_overlap_score": 0.0,
            "project_semantic_score": 0.0,
            "project_skills": []
        }

    project_chunks = split_projects(project_text)
    semantic_score = semantic_project_similarity(project_chunks, jd_text)
    overlap_score = project_skill_overlap(project_text, jd_text)
    project_skills = extract_skills(project_text)

    # Boost score if strong project signals are clearly present
    HIGH_SIGNAL = ["rag", "llm", "langchain", "fastapi"]
    boost = 0
    for signal in HIGH_SIGNAL:
        if signal in project_text.lower():
            boost += 5

    final_score = min(100, round((0.6 * semantic_score) + (0.4 * overlap_score) + boost, 2))

    return {
        "project_relevance_score": final_score,
        "project_skill_overlap_score": overlap_score,
        "project_semantic_score": semantic_score,
        "project_skills": project_skills
    }