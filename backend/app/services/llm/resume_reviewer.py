from app.services.llm.llm_client import generate_response
from app.services.llm.json_utils import extract_json_from_response


def review_resume(resume_text: str, jd_text: str):
    """
    Analyze resume against job description using Gemini LLM
    Returns structured JSON output
    """

    # 🔥 Optimized short prompt (prevents timeout)
    prompt = f"""
You are an expert recruiter.

Analyze the resume against the job description.

RESUME (shortened):
{resume_text[:1200]}

JOB DESCRIPTION (shortened):
{jd_text[:1200]}

Return ONLY valid JSON in this exact format:
{{
  "rejection_reasons": ["reason1", "reason2"],
  "missing_skills": ["skill1", "skill2"],
  "weak_areas": ["weakness1", "weakness2"],
  "overall_evaluation": "short summary"
}}

Rules:
- No markdown
- No explanation outside JSON
- Keep output concise
"""

    try:
        # 🔥 Call Gemini
        response = generate_response(prompt)

        # 🔥 Extract JSON safely
        parsed = extract_json_from_response(response)

        return parsed

    except Exception as e:
        print("❌ REVIEW ERROR:", str(e))

        # 🔥 Safe fallback response
        return {
            "rejection_reasons": ["Could not analyze resume"],
            "missing_skills": [],
            "weak_areas": [],
            "overall_evaluation": "LLM review temporarily unavailable"
        }