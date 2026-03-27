from fastapi import FastAPI
from app.api.routes import resume, jobs, scoring, health

app = FastAPI(
    title="JobMatchAI API",
    version="1.0.0",
    description="AI-powered Resume & Job Matching System"
)

app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(resume.router, prefix="/resume", tags=["Resume"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(scoring.router, prefix="/scoring", tags=["Scoring"])

@app.get("/")
def root():
    return {"message": "Welcome to JobMatchAI API"}