from pydantic import BaseModel, HttpUrl
from typing import Optional

# --- Request Models ---

class AnalyzeRequest(BaseModel):
    url: str  # GitHub repo URL passed from frontend


# --- Response Models ---

class RepoMeta(BaseModel):
    repo_name: str
    owner: str
    stars: int
    forks: int
    open_issues: int
    description: Optional[str] = None
    default_branch: str
    is_private: bool
    languages: dict[str, int]  # e.g. {"Python": 14203, "JavaScript": 4821}


class AnalysisResult(BaseModel):
    tech_stack: Optional[str] = None
    structure_summary: Optional[str] = None
    code_quality: Optional[str] = None
    improvements: Optional[str] = None
    overall_assessment: Optional[str] = None
    raw: str  # full Claude response always stored here as fallback


class AnalyzeResponse(BaseModel):
    meta: RepoMeta
    analysis: AnalysisResult