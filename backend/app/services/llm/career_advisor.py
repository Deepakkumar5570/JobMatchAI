from app.services.llm.llm_client import generate_response

def career_advice(resume_text: str, jd_text: str) -> str:
    prompt = f"""
You are a career advisor for AI/ML roles.

Based on this resume and job description, suggest:

1. Skills to learn
2. Projects to improve profile
3. Resume improvements
4. Career roadmap for next 2-3 months

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Keep it practical and actionable.
"""
    return generate_response(prompt)