import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import { projects as localProjects } from "Data/projects";

import HugoMeetExperienceCanvas from "./HugoMeetExperienceCanvas";

export default async function ProjectsPage() {
	const localProject = localProjects.find(p => p.id === "6338ffeb5e00275fb5051c9e")!;
	const apiData = await ProjectApiRoutes.get_single_project("6338ffeb5e00275fb5051c9e");
	const project = {
		_id: localProject.id,
		name: localProject.name,
		description: localProject.description,
		stats: apiData?.stats || {},
	};
	return (
		<>
			<HugoMeetExperienceCanvas />
			<Project
				project={project}
				moreButtonRedirection={"/redirects/hugomeet"}
				moreTextOverride={"Go to HugoMeet"}
				i18n
			/>
		</>
	);
}

export const revalidate = 60 * 60 * 24; /* each day */

// Tell nextjs to pre-render the pages where the dynamic params [locale] is "en" and "fr"
export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fr" }];
}
