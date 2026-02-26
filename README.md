# AI-Driven Smart Resume Parser & Career Agent

An agentic AI system that helps job seekers by analyzing their resumes against specific job descriptions. It uses the Gemini AI model to perform a gap analysis, suggest courses to upskill, and evaluate matches. 

## Features
- **PDF Parsing**: Automatically extracts text from uploaded PDF resumes.
- **AI Gap Analysis**: Analyzes missing skills compared to the target role.
- **Course Suggestions**: Recommends targeted learning.
- **Match Score**: Outputs a visual percentage fit.
- **Modern UI**: Built with React and Tailwind CSS v4.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: Python (FastAPI), MongoDB
- AI: Google Gemini API

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- MongoDB running locally or Atlas cloud cluster.
- Gemini API Key.

### 1. Backend Setup (FastAPI)
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment (created automatically):
   ```bash
   # Windows
   .\\venv\\Scripts\\activate
   # Mac/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt # (or ensure pip install fastapi uvicorn motor pymupdf python-multipart google-generativeai pydantic is run)
   ```
4. Create a `.env` file in the `backend` directory:
   ```env
   GEMINI_API_KEY=your_gemini_key_here
   MONGO_URL=mongodb://localhost:27017 # Or your Atlas URI
   ```
5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at http://localhost:8000

### 2. Frontend Setup (React)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The app will run at http://localhost:5173

## Deployment
- **Frontend** can be deployed directly to [Vercel](https://vercel.com/) or Netlify.
- **Backend** can be hosted on Render, Railway, or Heroku. Ensure you define `GEMINI_API_KEY` and `MONGO_URL` in the environment variables of your hosting provider.
