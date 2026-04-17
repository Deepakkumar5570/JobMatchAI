#from google import genai
# import google.generativeai as genai
# from dotenv import load_dotenv
# import os
# from pathlib import Path

# # Load .env
# env_path = Path(__file__).resolve().parents[3] / ".env"
# load_dotenv(dotenv_path=env_path)

# api_key = os.getenv("GEMINI_API_KEY")

# if not api_key:
#     raise ValueError("GEMINI_API_KEY not found")

# print("Gemini Key Loaded:", api_key[:10] + "...")

# # Create client
# client = genai.Client(api_key=api_key)

# def generate_response(prompt: str) -> str:
#     try:
#         response = client.models.generate_content(
#             model="gemini-2.5-flash-lite",
#             contents=prompt
#         )
#         return response.text.strip()
#     except Exception as e:
#         return f"LLM Error: {str(e)}"




import google.generativeai as genai
import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env safely
env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(dotenv_path=env_path)


def get_client():
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY not found")

    genai.configure(api_key=api_key)
    return genai


def generate_response(prompt: str) -> str:
    try:
        genai_client = get_client()

        model = genai_client.GenerativeModel("gemini-pro")

        response = model.generate_content(prompt)

        return response.text.strip()

    except Exception as e:
        return f"LLM Error: {str(e)}"



