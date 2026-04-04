import Express from "express";
import { IRequestResponse } from "@hcabel/rest-api-utils";
import { IRouteGetProjectStats } from "@hcabel/types/ProjectApi";
import { getProjectStats } from "../../data/statsStore";

export async function get_project_stats(
	req: Express.Request
): Promise<IRequestResponse<IRouteGetProjectStats>> {
	// check inputs
	const projectName = req.params.name?.trim();
	if (!projectName) {
		return {
			status: 400,
			json: {
				error: "Invalid inputs",
			},
		};
	}

	const stats = getProjectStats(projectName);
	if (!stats) {
		return {
			status: 404,
			json: {
				error: "Project not found",
			},
		};
	}

	return {
		status: 200,
		json: stats,
	};
}
