def generate_rejection_reasons(ats_score: float, semantic_score: float, missing_skills: list) -> list:
    reasons = []

    if ats_score < 60:
        reasons.append("Your resume is missing several important job-specific keywords.")

    if semantic_score < 65:
        reasons.append("Your overall experience and project descriptions may not strongly align with the role.")

    if len(missing_skills) > 0:
        reasons.append(f"Important missing skills include: {', '.join(missing_skills[:5])}")

    if not reasons:
        reasons.append("Your resume appears reasonably aligned with this role.")

    return reasons