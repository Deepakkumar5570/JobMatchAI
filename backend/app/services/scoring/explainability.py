def generate_rejection_reasons(ats_score: float, semantic_score: float, missing_skills: list) -> list:
    reasons = []

    if ats_score < 60:
        reasons.append("Your resume is missing several important job-specific technical keywords, which may hurt ATS screening.")

    elif ats_score < 80:
        reasons.append("Your resume matches many required keywords, but still misses some important role-specific skills.")

    if semantic_score < 65:
        reasons.append("Your project and experience descriptions may not strongly align with the overall responsibilities of the role.")

    elif semantic_score < 80:
        reasons.append("Your background appears relevant, but your resume could describe your technical work in a more role-aligned way.")

    if len(missing_skills) > 0:
        reasons.append(f"Important missing skills include: {', '.join(missing_skills[:5])}")

    if not reasons:
        reasons.append("Your resume appears strongly aligned with this role.")

    return reasons