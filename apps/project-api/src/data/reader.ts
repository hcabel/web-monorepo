import * as fs from "fs";
import * as path from "path";
import { IStats } from "@hcabel/types/ProjectApi";

const STATS_FILE_PATH = path.join(__dirname, "../../data/stats.json");

export function getStatsForProject(projectId: string): IStats {
	try {
		const content = fs.readFileSync(STATS_FILE_PATH, "utf-8");
		const allStats: Record<string, IStats> = JSON.parse(content);
		return allStats[projectId] || {};
	} catch {
		return {};
	}
}
