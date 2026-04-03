import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import { projects as localProjects } from "Data/projects";
import UvchExperienceCanvas from "./UvchExperienceCanvas";

export default async function ProjectsPage() {
	const localProject = localProjects.find(p => p.id === "633900a7471d8a488d9ab4a3")!;
	const apiData = await ProjectApiRoutes.get_single_project("633900a7471d8a488d9ab4a3");
	const project = {
		_id: localProject.id,
		name: localProject.name,
		description: localProject.description,
		stats: apiData?.stats || {},
	};
	return (
		<>
			<UvchExperienceCanvas />
			<Project
				project={project}
				moreButtonRedirection="/redirects/unreal-vscode-helper"
			/>
		</>
	);
}

export const revalidate = 60 * 60 * 24; /* each day */

// Tell nextjs to pre-render the pages where the dynamic params [locale] is "en" and "fr"
export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fr" }];
}
