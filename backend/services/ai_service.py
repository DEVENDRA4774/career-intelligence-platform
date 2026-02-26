import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
client = None
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')

async def analyze_gap(resume_text: str, job_description: str) -> dict:
    prompt = f"""
    You are an expert technical recruiter, career coach, and AI career intelligence platform.
    I am providing you with a candidate's resume and a job description.
    
    Resume:
    {resume_text}
    
    Job Description:
    {job_description}
    
    Please perform a deep, comprehensive analysis of the candidate against this role.
    You must provide the output STRICTLY in JSON format with the following exact structure. Ensure it is valid JSON.
    
    {{
        "match_scores": {{
            "overall": 85, // Integer 0-100
            "skills": 80, // Integer 0-100
            "experience": 90 // Integer 0-100
        }},
        "summary": "A brief 2-3 sentence executive summary of the candidate's fit.",
        "skill_gap": [
            {{"skill": "Python", "candidate_level": 80, "required_level": 90}}, // 5-8 key skills from JD
            {{"skill": "React", "candidate_level": 40, "required_level": 80}}
        ],
        "missing_skills": ["List", "of", "missing", "skills"],
        "overqualified_areas": ["List", "of", "areas", "they", "exceed", "requirements"],
        "course_suggestions": ["List", "of", "suggested", "courses", "to", "bridge", "the", "gap"],
        "recruiter_simulation": {{
            "first_impression": "What the recruiter notices in the first 3 seconds.",
            "loss_of_interest": "Where the recruiter might lose interest or see a red flag.",
            "estimated_screening_time": "e.g., '8 seconds (Pass)' or '15 seconds (Borderline)'"
        }},
        "salary_prediction": {{
            "expected_range": "e.g., $110,000 - $140,000",
            "market_demand_score": 85, // Integer 0-100 based on the skills in the current market
            "alert": "Underpaid Alert / High Demand / Standard"
        }},
        "interview_prep": {{
            "predicted_difficulty": "e.g., Hard (Heavy System Design focus)",
            "likely_technical_questions": ["Question 1", "Question 2", "Question 3"],
            "likely_behavioral_questions": ["Question 1", "Question 2"]
        }}
    }}
    
    Do not add markdown backticks like ```json around the response. Return raw JSON only.
    """
    try:
        response = model.generate_content(prompt)
        # Parse output as JSON
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3]
        elif text.startswith("```"):
            text = text[3:-3]
        return json.loads(text.strip())
    except Exception as e:
        print(f"Error calling Gemini for analysis: {e}")
        return {"error": str(e)}

async def rewrite_resume_bullet(bullet_point: str, job_description: str) -> str:
    prompt = f"""
    You are an expert resume writer.
    Job Description context:
    {job_description}
    
    Original Resume Bullet Point:
    {bullet_point}
    
    Please rewrite this bullet point to better align with the keywords and tone of the Job Description, while keeping it truthful. Make it impactful and action-oriented. Provide ONLY the rewritten text cleanly.
    """
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return bullet_point
