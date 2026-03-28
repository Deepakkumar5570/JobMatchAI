WEAK_PATTERNS = [
    "developed a chatbot",
    "worked on ai",
    "made a project",
    "created a model",
    "did machine learning",
    "worked with python",
    "built an app"
]

def analyze_project_bullets(project_text: str) -> dict:
    text = project_text.lower()
    weak_hits = [pattern for pattern in WEAK_PATTERNS if pattern in text]

    return {
        "weak_bullets_found": weak_hits,
        "weak_bullet_count": len(weak_hits)
    }