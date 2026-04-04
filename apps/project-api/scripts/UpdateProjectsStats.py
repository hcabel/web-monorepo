import json
import os
import tempfile
from dotenv import load_dotenv

from projects import Project
from stats import (
	GitHubStars,
	GithubForks,
	YoutubeViews,
	YoutubeViewsFr,
	YoutubeViewsEn,
	VsCodeInstalls
)

STATS_FILE_PATH = os.path.join(os.path.dirname(__file__), '../data/stats.json')

def main():
	# Load existing stats from JSON (initialize to empty dict if file doesn't exist)
	try:
		with open(STATS_FILE_PATH, 'r') as f:
			all_stats = json.load(f)
	except FileNotFoundError:
		print(f"Stats file not found at {STATS_FILE_PATH}, starting with empty stats.")
		all_stats = {}

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

	for project in projects:
		if project.name not in all_stats:
			all_stats[project.name] = {}

		for stat in project.stats:
			stat.update()

			platform = stat.platform
			if platform not in all_stats[project.name]:
				all_stats[project.name][platform] = []

			stat_name = stat.name.to_mongo()
			# Find and update existing stat entry or add new one
			existing = None
			for entry in all_stats[project.name][platform]:
				if entry["name"] == stat_name:
					existing = entry
					break

			if existing is not None:
				existing["value"] = stat.value
			else:
				all_stats[project.name][platform].append({
					"name": stat_name,
					"value": stat.value,
					"url": stat.get_url()
				})

			print(f"Updated stat: {project.name}: {stat}")

	# Write atomically: write to a temp file then replace the original
	stats_dir = os.path.dirname(STATS_FILE_PATH)
	with tempfile.NamedTemporaryFile('w', dir=stats_dir, delete=False, suffix='.tmp', encoding='utf-8') as tmp:
		json.dump(all_stats, tmp, indent=2, ensure_ascii=False)
		tmp_path = tmp.name
	os.replace(tmp_path, STATS_FILE_PATH)

if (__name__ == "__main__"):
	load_dotenv()
	main()
