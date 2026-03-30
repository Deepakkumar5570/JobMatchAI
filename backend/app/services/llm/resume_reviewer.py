from app.services.llm.llm_client import generate_response

def review_resume(resume_text: str, jd_text: str) -> str:
    prompt = f"""
You are an expert recruiter.

Analyze this resume against the job description.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Return:
1. Why candidate may get rejected
2. Missing skills
3. Weak areas in resume
4. Overall evaluation

Keep the answer concise, practical, and structured.
"""
    return generate_response(prompt)