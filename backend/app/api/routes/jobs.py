from fastapi import APIRouter
from pydantic import BaseModel
from app.services.parser.jd_parser import parse_job_description
from app.services.extraction.skill_extractor import extract_skills

router = APIRouter()

class JobDescriptionInput(BaseModel):
    jd_text: str

@router.post("/parse")
def parse_jd(data: JobDescriptionInput):
    parsed_jd = parse_job_description(data.jd_text)
    skills = extract_skills(parsed_jd["cleaned_text"])

    return {
        "jd_text_preview": parsed_jd["raw_text"][:1000],
        "extracted_skills": skills
    }