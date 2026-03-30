from app.services.llm.llm_client import generate_response

def generate_interview_questions(resume_text: str, jd_text: str) -> str:
    prompt = f"""
You are an AI interviewer.

Based on this resume and job description, generate:

1. 5 technical interview questions
2. 3 project-based questions
3. 3 HR questions

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Keep questions realistic for an AI Engineer / ML role.
"""
    return generate_response(prompt)