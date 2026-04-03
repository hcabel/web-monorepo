import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import ProceduralTerrainExperienceCanvas from "./ProceduralTerrainExperienceCanvas";

export default async function ProjectsPage() {
	const stats = await ProjectApiRoutes.get_project_stats("Procedural Terrain");
	return (
		<>
			<ProceduralTerrainExperienceCanvas />
			<Project
				name="Procedural Terrain"
				stats={stats}
			/>
		</>
	);
}

export const revalidate = 86400; /* each day */

export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fr" }];
}
