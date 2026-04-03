import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import { getProject } from "Data/projects";
import UvchExperienceCanvas from "./UvchExperienceCanvas";

export default async function ProjectsPage() {
const project = getProject("Unreal VsCode Helper");
const stats = await ProjectApiRoutes.get_project_stats("Unreal VsCode Helper");
return (
<>
<UvchExperienceCanvas />
<Project
project={project}
stats={stats}
moreButtonRedirection="/redirects/unreal-vscode-helper"
/>
</>
);
}

export const revalidate = 60 * 60 * 24; /* each day */

export async function generateStaticParams() {
return [{ locale: "en" }, { locale: "fr" }];
}
