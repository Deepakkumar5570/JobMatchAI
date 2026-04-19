import os
from dotenv import load_dotenv
from google import genai

# ✅ LOAD .env FILE (VERY IMPORTANT)
load_dotenv()

client = None


def get_llm():
    global client

    if client is None:
        api_key = os.getenv("GEMINI_API_KEY")

        print("DEBUG API KEY:", api_key)  # 👈 debug line

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        client = genai.Client(api_key=api_key)

    return client


def generate_response(prompt: str) -> str:
    try:
        llm = get_llm()

        response = llm.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        return f"LLM Error: {str(e)}"