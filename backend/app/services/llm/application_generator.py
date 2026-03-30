from app.services.llm.llm_client import generate_response

def generate_application(resume_text: str, jd_text: str) -> str:
    prompt = f"""
You are a professional job application assistant.

Based on this resume and job description, generate:

1. A short cold email
2. A short referral request message
3. A short LinkedIn DM

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Keep them concise, professional, and strong.
"""
    return generate_response(prompt)