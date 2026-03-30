from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm.resume_reviewer import review_resume
from app.services.llm.resume_rewriter import rewrite_projects
from app.services.llm.interview_generator import generate_interview_questions
from app.services.llm.career_advisor import generate_career_advice
from app.services.llm.application_generator import generate_application_messages

router = APIRouter()


class LLMRequest(BaseModel):
    resume_text: str
    jd_text: str
    project_text: str = ""


@router.post("/analyze")
def analyze_resume(req: LLMRequest):
    review = review_resume(req.resume_text, req.jd_text)
    rewritten_projects = rewrite_projects(req.project_text, req.jd_text)
    interview_questions = generate_interview_questions(
        req.resume_text, req.jd_text, req.project_text
    )
    career_advice = generate_career_advice(req.resume_text, req.jd_text)
    application_message = generate_application_messages(
        req.resume_text, req.jd_text
    )

    return {
        "review": review,
        "rewritten_projects": rewritten_projects,
        "interview_questions": interview_questions,
        "career_advice": career_advice,
        "application_message": application_message
    }