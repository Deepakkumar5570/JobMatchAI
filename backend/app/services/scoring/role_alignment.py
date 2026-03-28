def compute_role_alignment(predicted_role: str, resume_skills: list) -> float:
    role_skill_map = {
        "AI Engineer": ["llm", "langchain", "langgraph", "generative ai", "rag"],
        "ML Engineer": ["machine learning", "deep learning", "tensorflow", "pytorch"],
        "Computer Vision Engineer": ["computer vision", "opencv"],
        "Data Scientist": ["pandas", "numpy", "sql"],
        "Backend Engineer": ["fastapi", "flask", "django", "rest api"],
        "Full Stack Engineer": ["react", "next.js", "node.js", "mongodb"]
    }

    target_skills = role_skill_map.get(predicted_role, [])
    if not target_skills:
        return 50.0

    matched = sum(1 for skill in target_skills if skill in resume_skills)
    score = (matched / len(target_skills)) * 100
    return round(score, 2)