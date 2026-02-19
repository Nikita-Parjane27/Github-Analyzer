import asyncio
import re
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import AnalyzeRequest, AnalyzeResponse, RepoMeta, AnalysisResult
from github_service import get_repo_data, extract_file_paths
from analyzer import analyze_repo

load_dotenv()

app = FastAPI(
    title="GitHub Repo Analyzer",
    description="Paste a GitHub URL and get an AI-powered breakdown of the codebase.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

def parse_github_url(url: str) -> tuple[str, str]:
    url = url.strip().rstrip("/")
    match = re.match(r"https://github\.com/([^/]+)/([^/]+?)(?:\.git)?$", url)
    if not match:
        raise ValueError("Invalid GitHub URL. Expected format: https://github.com/owner/repo")
    return match.group(1), match.group(2)

@app.get("/")
def root():
    return {"message": "GitHub Repo Analyzer API is running."}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    try:
        owner, repo = parse_github_url(request.url)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    try:
        data = await get_repo_data(owner, repo)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch repo from GitHub: {str(e)}")

    if data["info"].get("private"):
        raise HTTPException(status_code=403, detail="This repository is private.")

    if not data.get("tree"):
        raise HTTPException(status_code=404, detail="Repository appears to be empty.")

    file_paths = extract_file_paths(data["tree"])

    try:
        result = analyze_repo(data["info"], file_paths, data["languages"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

    return AnalyzeResponse(
        meta=RepoMeta(
            repo_name=data["info"]["name"],
            owner=owner,
            stars=data["info"]["stargazers_count"],
            forks=data["info"]["forks_count"],
            open_issues=data["info"]["open_issues_count"],
            description=data["info"].get("description"),
            default_branch=data["info"]["default_branch"],
            is_private=data["info"]["private"],
            languages=data["languages"]
        ),
        analysis=AnalysisResult(raw=result["analysis"])
    )