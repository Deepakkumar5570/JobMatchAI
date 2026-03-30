from fastapi import FastAPI
from app.api.routes import resume, jobs, scoring, health, llm

app = FastAPI(
    title="JobMatchAI API",
    version="1.0.0",
    description="AI-powered Resume & Job Matching System"
)

# Health route
app.include_router(health.router, prefix="/health", tags=["Health"])

# Resume upload + parsing
app.include_router(resume.router, prefix="/resume", tags=["Resume"])

# Job description parsing
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])

# Scoring + matching engine
app.include_router(scoring.router, prefix="/scoring", tags=["Scoring"])

# LLM intelligence layer
app.include_router(llm.router, prefix="/llm", tags=["LLM"])

@app.get("/")
def root():
    return {"message": "Welcome to JobMatchAI API"}