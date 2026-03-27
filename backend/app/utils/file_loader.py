import fitz  # PyMuPDF
from docx import Document

def load_pdf_text(file_path: str) -> str:
    text = ""
    doc = fitz.open(file_path)
    for page in doc:
        text += page.get_text()
    return text

def load_docx_text(file_path: str) -> str:
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def load_txt_text(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def extract_text_from_file(file_path: str) -> str:
    if file_path.endswith(".pdf"):
        return load_pdf_text(file_path)
    elif file_path.endswith(".docx"):
        return load_docx_text(file_path)
    elif file_path.endswith(".txt"):
        return load_txt_text(file_path)
    else:
        raise ValueError("Unsupported file format")