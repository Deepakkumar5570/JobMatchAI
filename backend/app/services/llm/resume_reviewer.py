import json
from app.services.llm.llm_client import generate_response

def review_resume(resume_text: str, jd_text: str):
    prompt = f"""
You are an expert recruiter.

Analyze this resume against the job description.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Return ONLY valid JSON in this exact format:

{{
  "rejection_reasons": ["reason1", "reason2"],
  "missing_skills": ["skill1", "skill2"],
  "weak_areas": ["weakness1", "weakness2"],
  "overall_evaluation": "short summary"
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    response = generate_response(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "rejection_reasons": ["Could not parse LLM response"],
            "missing_skills": [],
            "weak_areas": [],
            "overall_evaluation": response
        }