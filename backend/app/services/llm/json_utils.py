import json
import re


def extract_json_from_response(response: str):
    """
    Safely extract JSON from LLM response
    Never crashes — always returns valid structure
    """

    if not response or not response.strip():
        return fallback_response("Empty LLM response")

    response = response.strip()

    # 🔥 Remove markdown if exists
    response = response.replace("```json", "").replace("```", "").strip()

    # 🔥 Try direct JSON parse
    try:
        return json.loads(response)
    except:
        pass

    # 🔥 Try extracting JSON block
    match = re.search(r"\{[\s\S]*\}", response)
    if match:
        try:
            return json.loads(match.group(0))
        except:
            pass

    # 🔥 Try fixing common issues (quotes, trailing commas)
    try:
        cleaned = response.replace("\n", " ")
        cleaned = re.sub(r",\s*}", "}", cleaned)
        cleaned = re.sub(r",\s*]", "]", cleaned)
        return json.loads(cleaned)
    except:
        pass

    # ❌ NEVER CRASH — return fallback
    return fallback_response(response)


def fallback_response(error_msg: str):
    return {
        "rejection_reasons": ["Could not parse LLM response"],
        "missing_skills": [],
        "weak_areas": [],
        "overall_evaluation": f"LLM output invalid: {error_msg[:100]}"
    }