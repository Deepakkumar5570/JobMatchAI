def calculate_fit_score(
    ats_score: float,
    semantic_score: float,
    project_score: float,
    role_alignment_score: float,
    project_strength_score: float
) -> float:
    final_score = (
        0.30 * ats_score +
        0.25 * semantic_score +
        0.20 * project_score +
        0.15 * role_alignment_score +
        0.10 * project_strength_score
    )
    return round(final_score, 2)