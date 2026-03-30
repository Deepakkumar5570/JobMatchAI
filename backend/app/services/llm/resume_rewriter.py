import json
from app.services.llm.llm_client import generate_response

def rewrite_resume(project_text: str, jd_text: str):
    prompt = f"""
You are an expert resume writer.

Rewrite these project descriptions so they match the job better.

PROJECTS:
{project_text}

JOB DESCRIPTION:
{jd_text}

Return ONLY valid JSON in this exact format:

{{
  "rewritten_projects": [
    "bullet 1",
    "bullet 2",
    "bullet 3"
  ]
}}

Do not write markdown.
Do not add explanation outside JSON.
"""

    response = generate_response(prompt)

    try:
        parsed = json.loads(response)
        return parsed.get("rewritten_projects", [])
    except:
        return [response]