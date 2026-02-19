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

# ─── CORS ─────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # ← changed to * for now
    allow_credentials=False,   # ← must be False when using *
    allow_methods=["*"],
    allow_headers=["*"]
)