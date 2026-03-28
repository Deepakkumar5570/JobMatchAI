from app.utils.constants import SKILL_SYNONYMS

def extract_skills(text: str) -> list:
    text = text.lower()
    found_skills = set()

    for canonical_skill, variants in SKILL_SYNONYMS.items():
        for variant in variants:
            if variant in text:
                found_skills.add(canonical_skill)
                break

    return sorted(list(found_skills))