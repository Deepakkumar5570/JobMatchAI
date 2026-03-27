def calculate_fit_score(ats_score: float, semantic_score: float) -> float:
    final_score = (0.4 * ats_score) + (0.6 * semantic_score)
    return round(final_score, 2)