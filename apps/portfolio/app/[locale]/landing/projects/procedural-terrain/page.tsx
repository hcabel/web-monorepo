import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import { projects as localProjects } from "Data/projects";
import ProceduralTerrainExperienceCanvas from "./ProceduralTerrainExperienceCanvas";

export default async function ProjectsPage() {
	const localProject = localProjects.find(p => p.id === "6339018aa4c9d89b6ed06751")!;
	const apiData = await ProjectApiRoutes.get_single_project("6339018aa4c9d89b6ed06751");
	const project = {
		_id: localProject.id,
		name: localProject.name,
		description: localProject.description,
		stats: apiData?.stats || {},
	};
	return (
		<>
			<ProceduralTerrainExperienceCanvas />
			<Project
				project={project}
			/>
		</>
	);
}

export const revalidate = 60 * 60 * 24; /* each day */

// Tell nextjs to pre-render the pages where the dynamic params [locale] is "en" and "fr"
export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fr" }];
}
