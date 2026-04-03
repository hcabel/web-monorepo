import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import UvchExperienceCanvas from "./UvchExperienceCanvas";

export default async function ProjectsPage() {
	const stats = await ProjectApiRoutes.get_project_stats("Unreal VsCode Helper");
	return (
		<>
			<UvchExperienceCanvas />
			<Project
				name="Unreal VsCode Helper"
				stats={stats}
				moreButtonRedirection="/redirects/unreal-vscode-helper"
			/>
		</>
	);
}

export const revalidate = 86400; /* each day */

export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fr" }];
}
