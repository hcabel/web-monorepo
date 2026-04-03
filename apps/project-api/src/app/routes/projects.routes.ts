import Express from "express";
import { IRequestResponse } from "@hcabel/rest-api-utils";
import { IRouteGetProjectStats } from "@hcabel/types/ProjectApi";
import { IStatModelArrayToIStats } from "./utils/stats.utils";
import { IProjectApiDatabase } from "../../database/database";

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

// Get Database
const db = req.app.get("database") as IProjectApiDatabase;

// Look up project by name to get its ID
const project = await db.queries.Project.read_single({ name: projectName });
if (project === undefined) {
return {
status: 404,
json: {
error: "Project not found",
},
};
} else if (!project) {
throw new Error("Query failed while getting project by name");
}

// Get stats by project ID
const stats = await db.queries.Stat.read({
project_id: project._id,
});
if (!stats) {
throw new Error("Query failed while getting stats by project id");
}

return {
status: 200,
json: IStatModelArrayToIStats(stats),
};
}
