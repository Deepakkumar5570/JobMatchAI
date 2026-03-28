ROLE_KEYWORDS = {
    "AI Engineer": ["llm", "langchain", "langgraph", "generative ai", "rag", "prompt engineering"],
    "ML Engineer": ["machine learning", "deep learning", "model deployment", "tensorflow", "pytorch"],
    "Computer Vision Engineer": ["computer vision", "opencv", "image classification", "object detection", "yolo"],
    "Data Scientist": ["data analysis", "statistics", "pandas", "numpy", "visualization", "sql"],
    "Backend Engineer": ["fastapi", "flask", "django", "rest api", "backend", "microservices"],
    "Full Stack Engineer": ["react", "next.js", "node.js", "mongodb", "frontend", "backend"]
}

def classify_role(jd_text: str) -> str:
    jd_text = jd_text.lower()
    scores = {}

    for role, keywords in ROLE_KEYWORDS.items():
        scores[role] = sum(1 for keyword in keywords if keyword in jd_text)

    best_role = max(scores, key=scores.get)
    return best_role if scores[best_role] > 0 else "General Software Role"