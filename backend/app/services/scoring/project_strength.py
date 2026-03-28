STRONG_PROJECT_SIGNALS = [
    "deployment", "deployed", "api", "fastapi", "docker", "scalable",
    "model", "trained", "fine-tuned", "pipeline", "retrieval", "rag",
    "langchain", "langgraph", "llm", "embedding", "vector", "database",
    "evaluation", "benchmark", "accuracy", "latency", "architecture"
]

def compute_project_strength(project_text: str) -> dict:
    text = project_text.lower()
    matched_signals = [signal for signal in STRONG_PROJECT_SIGNALS if signal in text]

    # Better scoring: reward strong project signals more fairly
    score = min(100, len(matched_signals) * 6)

    return {
        "project_strength_score": score,
        "strong_signals_found": matched_signals
    }