import json
from app.services.llm.llm_client import generate_response

def generate_interview_questions(resume_text: str, jd_text: str):
    prompt = f"""
You are an AI interviewer.

Based on this resume and job description, generate interview questions.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Return ONLY valid JSON in this exact format:

{{
  "technical": ["q1", "q2", "q3", "q4", "q5"],
  "project_based": ["q1", "q2", "q3"],
  "hr": ["q1", "q2", "q3"]
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    response = generate_response(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "technical": [],
            "project_based": [],
            "hr": [],
            "raw_output": response
        }