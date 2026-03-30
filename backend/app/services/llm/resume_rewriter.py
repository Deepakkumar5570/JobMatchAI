from app.services.llm.llm_client import generate_response
from app.services.llm.json_utils import extract_json_from_response

def rewrite_projects(project_text: str, jd_text: str):
    if not project_text.strip():
        return []

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

    try:
        response = generate_response(prompt)
        parsed = extract_json_from_response(response)
        return parsed.get("rewritten_projects", [])

    except Exception as e:
        print("REWRITER ERROR:", str(e))
        return ["Could not generate rewritten projects."]