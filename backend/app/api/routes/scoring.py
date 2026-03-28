from fastapi import APIRouter
from pydantic import BaseModel
from app.services.extraction.skill_extractor import extract_skills
from app.services.scoring.ats_score import calculate_ats_score
from app.services.retrieval.semantic_matcher import compute_semantic_similarity
from app.services.retrieval.project_matcher import compute_project_relevance
from app.services.scoring.fit_score import calculate_fit_score
from app.services.scoring.explainability import generate_rejection_reasons
from app.services.parser.role_classifier import classify_role
from app.services.scoring.role_alignment import compute_role_alignment
from app.services.scoring.project_strength import compute_project_strength
from app.services.scoring.bullet_analyzer import analyze_project_bullets
from app.utils.text_cleaner import clean_text

router = APIRouter()

class MatchRequest(BaseModel):
    resume_text: str
    jd_text: str
    project_text: str = ""

@router.post("/match")
def match_resume_to_job(data: MatchRequest):
    cleaned_resume = clean_text(data.resume_text)
    cleaned_jd = clean_text(data.jd_text)
    cleaned_projects = clean_text(data.project_text)

    resume_skills = extract_skills(cleaned_resume)
    jd_skills = extract_skills(cleaned_jd)

    ats_result = calculate_ats_score(resume_skills, jd_skills)
    semantic_score = compute_semantic_similarity(cleaned_resume, cleaned_jd)

    project_result = compute_project_relevance(cleaned_projects, cleaned_jd)
    project_strength = compute_project_strength(cleaned_projects)
    bullet_analysis = analyze_project_bullets(cleaned_projects)

    predicted_role = classify_role(cleaned_jd)
    role_alignment_score = compute_role_alignment(predicted_role, resume_skills)

    fit_score = calculate_fit_score(
        ats_result["ats_score"],
        semantic_score,
        project_result["project_relevance_score"],
        role_alignment_score,
        project_strength["project_strength_score"]
    )

    reasons = generate_rejection_reasons(
        ats_result["ats_score"],
        semantic_score,
        ats_result["missing_skills"]
    )

    return {
        "predicted_role": predicted_role,
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "matched_skills": ats_result["matched_skills"],
        "missing_skills": ats_result["missing_skills"],
        "extra_skills": ats_result["extra_skills"],

        "ats_score": ats_result["ats_score"],
        "semantic_score": semantic_score,

        "project_relevance_score": project_result["project_relevance_score"],
        "project_skill_overlap_score": project_result["project_skill_overlap_score"],
        "project_semantic_score": project_result["project_semantic_score"],
        "project_skills": project_result["project_skills"],

        "project_strength_score": project_strength["project_strength_score"],
        "strong_signals_found": project_strength["strong_signals_found"],

        "weak_bullets_found": bullet_analysis["weak_bullets_found"],
        "weak_bullet_count": bullet_analysis["weak_bullet_count"],

        "role_alignment_score": role_alignment_score,
        "fit_score": fit_score,

        "rejection_reasons": reasons
    }