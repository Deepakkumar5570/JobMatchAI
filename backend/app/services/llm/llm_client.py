import os
from dotenv import load_dotenv
import google.generativeai as genai

# ✅ LOAD ENV
load_dotenv()

# ✅ GLOBAL FLAG (avoid re-config again & again)
is_configured = False


def get_llm():
    global is_configured

    if not is_configured:
        api_key = os.getenv("GEMINI_API_KEY")

        print("DEBUG API KEY:", api_key)

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        # ✅ Correct configuration
        genai.configure(api_key=api_key)

        is_configured = True

    return genai


def generate_response(prompt: str) -> str:
    try:
        llm = get_llm()

        # ✅ Correct model call
        model = llm.GenerativeModel("gemini-2.5-flash-lite")

        response = model.generate_content(prompt)

        # ✅ Safe return
        return response.text if hasattr(response, "text") else str(response)

    except Exception as e:
        print("LLM ERROR:", str(e))
        return f"LLM Error: {str(e)}"