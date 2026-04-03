from dotenv import load_dotenv
import json
import os

from utils.github_api_utils import get_github_repo_data
from utils.vscode_marketplace_api_utils import get_vscode_marketplace_data
from utils.youtube_api_utils import get_youtube_video_data

from projects import Project
from stats import (
GitHubStars,
GithubForks,
YoutubeViews,
YoutubeViewsFr,
YoutubeViewsEn,
VsCodeInstalls
)

# Project IDs matching the hardcoded data in the project-api and portfolio
PROJECT_IDS = {
"Unreal VsCode Helper": "633900a7471d8a488d9ab4a3",
"HugoMeet": "6338ffeb5e00275fb5051c9e",
"Procedural Terrain": "6339018aa4c9d89b6ed06751",
}

def main():
projects = [
Project("Unreal VsCode Helper", [
GitHubStars("hcabel", "UnrealVsCodeHelper"),
GithubForks("hcabel", "UnrealVsCodeHelper"),
VsCodeInstalls("HugoCabel.uvch"),
YoutubeViews("https://www.youtube.com/watch?v=_usDZ6osnR4")
]),
Project("HugoMeet", [
GitHubStars("hcabel", "HugoMeet"),
GithubForks("hcabel", "HugoMeet"),
YoutubeViewsFr("https://www.youtube.com/watch?v=XQ5PZToo1qo"),
YoutubeViewsEn("https://www.youtube.com/watch?v=2oupECsHxPU")
]),
Project("Procedural Terrain", [
YoutubeViews("https://www.youtube.com/watch?v=MHB8Tn3zbqM")
])
]

# Build stats JSON keyed by project id
all_stats = {}

for project in projects:
project_id = PROJECT_IDS.get(project.name)
if not project_id:
print(f"Error: no id mapping found for project '{project.name}'")
continue

project_stats = {}

for stat in project.stats:
stat.update()
print(f"Updated stat: {project.name}: {stat}")

platform = stat.platform
if platform not in project_stats:
project_stats[platform] = []

project_stats[platform].append({
"_id": f"{project_id}_{platform}_{str(stat.name)}",
"name": stat.name.to_mongo(),
"value": stat.value,
"url": stat.get_url(),
})

all_stats[project_id] = project_stats

# Write stats to JSON file
output_path = os.path.normpath(os.path.join(
os.path.dirname(os.path.abspath(__file__)),
"../../apps/project-api/data/stats.json"
))

with open(output_path, "w") as f:
json.dump(all_stats, f, indent=2)

print(f"Stats written to {output_path}")

if (__name__ == "__main__"):
load_dotenv()
main()
