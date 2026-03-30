import json
from app.services.llm.llm_client import generate_response

def career_advice(resume_text: str, jd_text: str):
    prompt = f"""
You are a career advisor for AI/ML roles.

Based on this resume and job description, suggest improvements.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Return ONLY valid JSON in this exact format:

{{
  "skills_to_learn": ["skill1", "skill2", "skill3"],
  "projects_to_build": ["project1", "project2"],
  "resume_improvements": ["improvement1", "improvement2"],
  "roadmap_2_months": ["week1 plan", "week2 plan", "week3 plan", "week4 plan"]
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    response = generate_response(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "skills_to_learn": [],
            "projects_to_build": [],
            "resume_improvements": [],
            "roadmap_2_months": [],
            "raw_output": response
        }