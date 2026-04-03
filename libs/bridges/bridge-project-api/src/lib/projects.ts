
import { IStats } from "@hcabel/types/ProjectApi";

export function get_project_stats(projectName: string, options?: RequestInit): Promise<IStats>
{
	return (
		fetch(
			`${process.env.NX_PROJECT_API_ENDPOINT}/stats/${encodeURIComponent(projectName)}`,
			options || {}
		)
			.then((res) => res.json() as Promise<IStats>)
	);
}
