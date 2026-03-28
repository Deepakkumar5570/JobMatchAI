from fastapi import APIRouter
from pydantic import BaseModel
from app.services.parser.jd_parser import parse_job_description
from app.services.extraction.skill_extractor import extract_skills
from app.services.parser.role_classifier import classify_role

router = APIRouter()

class JobDescriptionInput(BaseModel):
    jd_text: str

@router.post("/parse")
def parse_jd(data: JobDescriptionInput):
    parsed_jd = parse_job_description(data.jd_text)
    skills = extract_skills(parsed_jd["cleaned_text"])
    predicted_role = classify_role(parsed_jd["cleaned_text"])

    return {
        "title": parsed_jd["title"],
        "jd_text_preview": parsed_jd["raw_text"][:1000],
        "predicted_role": predicted_role,
        "extracted_skills": skills
    }