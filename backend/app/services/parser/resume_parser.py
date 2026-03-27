from app.utils.file_loader import extract_text_from_file
from app.utils.text_cleaner import clean_text

def parse_resume(file_path: str) -> dict:
    raw_text = extract_text_from_file(file_path)
    cleaned_text = clean_text(raw_text)

    return {
        "raw_text": raw_text,
        "cleaned_text": cleaned_text
    }