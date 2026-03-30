from app.services.llm.llm_client import generate_response
from app.services.llm.json_utils import extract_json_from_response

def generate_application_messages(resume_text: str, jd_text: str):
    prompt = f"""
You are an expert job application assistant.

Generate professional application messages.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Return ONLY valid JSON in this exact format:
{{
  "cold_email": "email text",
  "referral_message": "referral text",
  "linkedin_dm": "linkedin message"
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    try:
        response = generate_response(prompt)
        return extract_json_from_response(response)

    except Exception as e:
        print("APPLICATION ERROR:", str(e))
        return {
            "cold_email": "N/A",
            "referral_message": "N/A",
            "linkedin_dm": "N/A"
        }