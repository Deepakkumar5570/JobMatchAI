from app.services.llm.llm_client import generate_response

def rewrite_resume(project_text: str, jd_text: str) -> str:
    prompt = f"""
You are an expert resume writer.

Rewrite these project descriptions so they match the job better.

PROJECTS:
{project_text}

JOB DESCRIPTION:
{jd_text}

Improve:
- technical depth
- impact
- ATS keywords
- clarity

Return only improved bullet points.
"""
    return generate_response(prompt)