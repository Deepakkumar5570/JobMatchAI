from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import resume, jobs, scoring, health, llm

app = FastAPI(
    title="JobMatchAI API",
    version="1.0.0",
    description="AI-powered Resume & Job Matching System"
)

# ----------------------------
# CORS middleware for frontend
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# API Routes
# ----------------------------
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(resume.router, prefix="/resume", tags=["Resume"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(scoring.router, prefix="/scoring", tags=["Scoring"])
app.include_router(llm.router, prefix="/llm", tags=["LLM"])

@app.get("/")
def root():
    return {"message": "Welcome to JobMatchAI API"}