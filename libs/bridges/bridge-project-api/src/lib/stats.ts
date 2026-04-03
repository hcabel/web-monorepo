import { IRouteGetProjectStats } from "@hcabel/types/ProjectApi";

export function get_project_stats(projectName: string, options?: RequestInit): Promise<IRouteGetProjectStats> {
	return (
		fetch(
			`${process.env.NX_PROJECT_API_ENDPOINT}/projects/${encodeURIComponent(projectName)}/stats`,
			options || {}
		)
			.then((res) => res.json() as Promise<IRouteGetProjectStats>)
	);
}
