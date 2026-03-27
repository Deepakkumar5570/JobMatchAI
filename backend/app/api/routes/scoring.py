from fastapi import APIRouter
from pydantic import BaseModel
from app.services.extraction.skill_extractor import extract_skills
from app.services.scoring.ats_score import calculate_ats_score
from app.services.retrieval.semantic_matcher import compute_semantic_similarity
from app.services.scoring.fit_score import calculate_fit_score
from app.services.scoring.explainability import generate_rejection_reasons
from app.utils.text_cleaner import clean_text

router = APIRouter()

class MatchRequest(BaseModel):
    resume_text: str
    jd_text: str

@router.post("/match")
def match_resume_to_job(data: MatchRequest):
    cleaned_resume = clean_text(data.resume_text)
    cleaned_jd = clean_text(data.jd_text)

    resume_skills = extract_skills(cleaned_resume)
    jd_skills = extract_skills(cleaned_jd)

    ats_result = calculate_ats_score(resume_skills, jd_skills)
    semantic_score = compute_semantic_similarity(cleaned_resume, cleaned_jd)
    fit_score = calculate_fit_score(ats_result["ats_score"], semantic_score)

    reasons = generate_rejection_reasons(
        ats_result["ats_score"],
        semantic_score,
        ats_result["missing_skills"]
    )

    return {
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "matched_skills": ats_result["matched_skills"],
        "missing_skills": ats_result["missing_skills"],
        "ats_score": ats_result["ats_score"],
        "semantic_score": semantic_score,
        "fit_score": fit_score,
        "rejection_reasons": reasons
    }