import os
import sys
from google import genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("API Key is missing from .env")
    sys.exit(1)

try:
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents="Hello, this is a test. Reply with 'OK'.",
    )
    print(f"SUCCESS. Response: {response.text}")
except Exception as e:
    print(f"ERROR: {str(e)}")
