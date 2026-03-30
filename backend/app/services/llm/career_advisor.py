from app.services.llm.llm_client import generate_response
from app.services.llm.json_utils import extract_json_from_response

def generate_career_advice(resume_text: str, jd_text: str):
    prompt = f"""
You are an expert career advisor.

Give career advice based on resume and job description.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Return ONLY valid JSON in this exact format:
{{
  "skills_to_learn": ["skill1", "skill2"],
  "projects_to_build": ["project1", "project2"],
  "resume_improvements": ["tip1", "tip2"],
  "roadmap_2_months": ["week1", "week2", "week3", "week4"]
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    try:
        response = generate_response(prompt)
        return extract_json_from_response(response)

    except Exception as e:
        print("CAREER ERROR:", str(e))
        return {
            "skills_to_learn": [],
            "projects_to_build": [],
            "resume_improvements": [],
            "roadmap_2_months": []
        }