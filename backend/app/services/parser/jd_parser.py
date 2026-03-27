from app.utils.text_cleaner import clean_text

def parse_job_description(jd_text: str) -> dict:
    cleaned_text = clean_text(jd_text)

    return {
        "raw_text": jd_text,
        "cleaned_text": cleaned_text
    }