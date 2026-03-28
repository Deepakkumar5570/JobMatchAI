import os
from fastapi import APIRouter, UploadFile, File
from app.core.config import UPLOAD_DIR
from app.services.parser.resume_parser import parse_resume
from app.services.extraction.skill_extractor import extract_skills

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    parsed_resume = parse_resume(file_path)
    skills = extract_skills(parsed_resume["cleaned_text"])

    return {
    "filename": file.filename,
    "resume_text_preview": parsed_resume["raw_text"][:1000],
    "sections": parsed_resume["sections"],
    "extracted_skills": skills
    }