from app.utils.text_cleaner import clean_text

def parse_job_description(jd_text: str) -> dict:
    cleaned_text = clean_text(jd_text)

    lines = [line.strip() for line in jd_text.split("\n") if line.strip()]
    title = lines[0] if lines else "Unknown Role"

    return {
        "raw_text": jd_text,
        "cleaned_text": cleaned_text,
        "title": title
    }