from app.utils.file_loader import extract_text_from_file
from app.utils.text_cleaner import clean_text

SECTION_HEADERS = {
    "education": ["education", "academic background"],
    "experience": ["experience", "work experience", "internship", "professional experience"],
    "projects": ["projects", "personal projects", "academic projects"],
    "skills": ["skills", "technical skills"],
    "certifications": ["certifications", "achievements", "licenses"]
}

def split_resume_sections(raw_text: str) -> dict:
    lines = [line.strip() for line in raw_text.split("\n") if line.strip()]
    sections = {
        "summary": [],
        "education": [],
        "experience": [],
        "projects": [],
        "skills": [],
        "certifications": []
    }

    current_section = "summary"

    for line in lines:
        lower_line = line.lower()

        matched_section = None
        for section, keywords in SECTION_HEADERS.items():
            if any(keyword in lower_line for keyword in keywords):
                matched_section = section
                break

        if matched_section:
            current_section = matched_section
            continue

        sections[current_section].append(line)

    return {k: "\n".join(v).strip() for k, v in sections.items()}

def parse_resume(file_path: str) -> dict:
    raw_text = extract_text_from_file(file_path)
    cleaned_text = clean_text(raw_text)
    sections = split_resume_sections(raw_text)

    return {
        "raw_text": raw_text,
        "cleaned_text": cleaned_text,
        "sections": sections
    }