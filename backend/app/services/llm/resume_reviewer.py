from app.services.llm.llm_client import generate_response
from app.services.llm.json_utils import extract_json_from_response

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

    try:
        response = generate_response(prompt)
        return extract_json_from_response(response)

    except Exception as e:
        print("REVIEW ERROR:", str(e))
        return {
            "rejection_reasons": ["Could not generate detailed review"],
            "missing_skills": [],
            "weak_areas": [],
            "overall_evaluation": "LLM review temporarily unavailable."
        }