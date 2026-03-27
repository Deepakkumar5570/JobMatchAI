from app.utils.constants import SKILL_KEYWORDS

def extract_skills(text: str) -> list:
    found_skills = []
    for skill in SKILL_KEYWORDS:
        if skill.lower() in text.lower():
            found_skills.append(skill)
    return sorted(list(set(found_skills)))