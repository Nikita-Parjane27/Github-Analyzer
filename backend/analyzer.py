from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_repo(repo_info: dict, file_paths: list, languages: dict) -> dict:
    prompt = f"""
    You are a senior software engineer analyzing a GitHub repository.
    
    Repository: {repo_info['name']}
    Description: {repo_info.get('description', 'N/A')}
    Stars: {repo_info.get('stargazers_count')}
    Languages: {languages}
    
    File structure (sample):
    {chr(10).join(file_paths)}
    
    Please provide:
    1. **Tech Stack** - frameworks, libraries, tools detected
    2. **Project Structure Summary** - what each major folder/module does
    3. **Code Quality Observations** - patterns you notice (good or bad)
    4. **Improvement Suggestions** - 3-5 concrete, actionable suggestions
    5. **Overall Assessment** - one paragraph summary
    
    Be specific and practical. Reference actual file paths where relevant.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return {"analysis": response.text}