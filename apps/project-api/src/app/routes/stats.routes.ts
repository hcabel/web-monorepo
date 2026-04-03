import Express from "express";
import { IRequestResponse } from "@hcabel/rest-api-utils";
import { IStats } from "@hcabel/types/ProjectApi";
import { getStatsForProject } from "../../data/reader";

export async function get_project_stats(
	req: Express.Request
): Promise<IRequestResponse<IStats>> {
	const { projectName } = req.params;

	if (!projectName) {
		return {
			status: 400,
			json: {
				error: "Invalid inputs",
			},
		};
	}

	const stats = getStatsForProject(projectName);

	return {
		status: 200,
		json: stats,
	};
}
