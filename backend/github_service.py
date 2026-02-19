import httpx
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"}

async def get_repo_data(owner: str, repo: str) -> dict:
    base = f"https://api.github.com/repos/{owner}/{repo}"

    async with httpx.AsyncClient(timeout=15.0) as client:
        # Step 1: fetch repo info first to get the default branch
        repo_res = await client.get(base, headers=HEADERS)

        if repo_res.status_code == 404:
            raise Exception(f"Repo '{owner}/{repo}' not found. Check the URL.")
        if repo_res.status_code == 401:
            raise Exception("GitHub token is invalid or missing.")
        if repo_res.status_code != 200:
            raise Exception(f"GitHub API error: {repo_res.status_code}")

        repo_info = repo_res.json()
        default_branch = repo_info.get("default_branch", "main")

        # Step 2: use the actual default branch for tree + languages
        tree_res, lang_res = await asyncio.gather(
            client.get(f"{base}/git/trees/{default_branch}?recursive=1", headers=HEADERS),
            client.get(f"{base}/languages", headers=HEADERS)
        )

    # Debug: print what we got back
    print(f"Repo info status: {repo_res.status_code}")
    print(f"Tree status: {tree_res.status_code}")
    print(f"Tree response: {tree_res.json()}")

    tree_data = tree_res.json()
    tree = tree_data.get("tree", [])

    # If tree is still empty, raise a clear error
    if not tree:
        raise Exception(
            f"Could not read file tree. Branch: '{default_branch}'. "
            f"Tree API response: {tree_data}"
        )

    return {
        "info": repo_info,
        "tree": tree,
        "languages": lang_res.json()
    }

def extract_file_paths(tree: list) -> list[str]:
    return [item["path"] for item in tree if item["type"] == "blob"][:80]