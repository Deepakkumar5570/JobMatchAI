def calculate_ats_score(resume_skills: list, jd_skills: list) -> dict:
    resume_set = set([s.lower() for s in resume_skills])
    jd_set = set([s.lower() for s in jd_skills])

    matched = resume_set.intersection(jd_set)
    missing = jd_set.difference(resume_set)

    if len(jd_set) == 0:
        score = 0
    else:
        score = round((len(matched) / len(jd_set)) * 100, 2)

    return {
        "ats_score": score,
        "matched_skills": sorted(list(matched)),
        "missing_skills": sorted(list(missing))
    }