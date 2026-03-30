import json
import re

def extract_json_from_response(response: str):
    if not response or not response.strip():
        raise ValueError("Empty LLM response")

    response = response.strip()

    # Remove markdown blocks
    response = response.replace("```json", "").replace("```", "").strip()

    # Try direct JSON parse
    try:
        return json.loads(response)
    except:
        pass

    # Try extracting JSON object
    match = re.search(r"\{[\s\S]*\}", response)
    if match:
        try:
            return json.loads(match.group(0))
        except:
            pass

    raise ValueError(f"Invalid JSON response: {response[:300]}")