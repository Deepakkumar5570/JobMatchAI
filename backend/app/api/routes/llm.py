from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm.resume_reviewer import review_resume
from app.services.llm.resume_rewriter import rewrite_resume
from app.services.llm.interview_generator import generate_interview_questions
from app.services.llm.career_advisor import career_advice
from app.services.llm.application_generator import generate_application

router = APIRouter()

class LLMRequest(BaseModel):
    resume_text: str
    jd_text: str
    project_text: str = ""

@router.post("/analyze")
def analyze_resume(data: LLMRequest):
    return {
        "review": review_resume(data.resume_text, data.jd_text),
        "rewritten_projects": rewrite_resume(data.project_text, data.jd_text),
        "interview_questions": generate_interview_questions(data.resume_text, data.jd_text),
        "career_advice": career_advice(data.resume_text, data.jd_text),
        "application_message": generate_application(data.resume_text, data.jd_text)
    }