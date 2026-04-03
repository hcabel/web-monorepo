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

# Build stats JSON keyed by project name
all_stats = {}

for project in projects:
project_stats = {}

for stat in project.stats:
stat.update()
print(f"Updated stat: {project.name}: {stat}")

platform = stat.platform
if platform not in project_stats:
project_stats[platform] = []

project_stats[platform].append({
"_id": f"{project.name}_{platform}_{str(stat.name)}",
"name": stat.name.to_mongo(),
"value": stat.value,
"url": stat.get_url(),
})

all_stats[project.name] = project_stats

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
