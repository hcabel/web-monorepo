import Express from "express";
import { Types } from "mongoose";
import { IRequestResponse } from "@hcabel/rest-api-utils";
import { IRouteGetProjectStats } from "@hcabel/types/ProjectApi";
import { IStatModelArrayToIStats } from "./utils/stats.utils";
import { IProjectApiDatabase } from "../../database/database";

// Hardcoded mapping of project names to their MongoDB ObjectIds in the stats collection.
// These IDs correspond to the project documents originally stored in the database.
const PROJECT_STAT_IDS: Record<string, string> = {
"HugoMeet": "6338ffeb5e00275fb5051c9e",
"Unreal VsCode Helper": "633900a7471d8a488d9ab4a3",
"Procedural Terrain": "6339018aa4c9d89b6ed06751",
};

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

const projectId = PROJECT_STAT_IDS[projectName];
if (!projectId) {
return {
status: 404,
json: {
error: "Project not found",
},
};
}

// Get Database
const db = req.app.get("database") as IProjectApiDatabase;

// Get stats by project ID
const stats = await db.queries.Stat.read({
project_id: new Types.ObjectId(projectId),
});
if (!stats) {
throw new Error("Query failed while getting stats by project id");
}

return {
status: 200,
json: IStatModelArrayToIStats(stats),
};
}
