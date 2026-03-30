import json
from app.services.llm.llm_client import generate_response

def generate_application(resume_text: str, jd_text: str):
    prompt = f"""
You are a professional job application assistant.

Based on this resume and job description, generate outreach content.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Return ONLY valid JSON in this exact format:

{{
  "cold_email": "short email",
  "referral_message": "short referral request",
  "linkedin_dm": "short linkedin message"
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    response = generate_response(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "cold_email": "",
            "referral_message": "",
            "linkedin_dm": "",
            "raw_output": response
        }