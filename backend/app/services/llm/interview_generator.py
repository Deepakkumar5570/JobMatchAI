from app.services.llm.llm_client import generate_response
from app.services.llm.json_utils import extract_json_from_response

def generate_interview_questions(resume_text: str, jd_text: str, project_text: str):
    prompt = f"""
You are an expert interviewer.

Generate interview questions based on resume, JD, and projects.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

PROJECTS:
{project_text}

Return ONLY valid JSON in this exact format:
{{
  "technical": ["q1", "q2", "q3"],
  "project_based": ["q1", "q2"],
  "hr": ["q1", "q2"]
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    try:
        response = generate_response(prompt)
        return extract_json_from_response(response)

    except Exception as e:
        print("INTERVIEW ERROR:", str(e))
        return {
            "technical": [],
            "project_based": [],
            "hr": []
        }