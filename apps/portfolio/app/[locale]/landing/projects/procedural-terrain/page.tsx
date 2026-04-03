import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import { i18nDict } from "Utils/i18nDict";
import ProceduralTerrainExperienceCanvas from "./ProceduralTerrainExperienceCanvas";

export default async function ProjectsPage() {
const stats = await ProjectApiRoutes.get_project_stats("Procedural Terrain").catch(() => ({}));
const project = {
_id: "6339018aa4c9d89b6ed06751",
name: "Procedural Terrain",
description: i18nDict["Procedural Terrain-Description"],
stats,
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
