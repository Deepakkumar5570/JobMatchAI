import google.generativeai as genai
from dotenv import load_dotenv
import os
from pathlib import Path

# Load .env
env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found")

print("Gemini Key Loaded:", api_key[:10] + "...")

# ✅ Configure Gemini
genai.configure(api_key=api_key)

# ✅ Use YOUR model (as requested)
model = genai.GenerativeModel("gemini-2.5-flash-lite")

# ✅ Correct response function
def generate_response(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        
        # Safe handling (sometimes response.text missing hota hai)
        if hasattr(response, "text"):
            return response.text.strip()
        else:
            return str(response)

    except Exception as e:
        return f"LLM Error: {str(e)}"