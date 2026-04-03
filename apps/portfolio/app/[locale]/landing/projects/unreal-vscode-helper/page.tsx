import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import { i18nDict } from "Utils/i18nDict";
import UvchExperienceCanvas from "./UvchExperienceCanvas";

export default async function ProjectsPage() {
const stats = await ProjectApiRoutes.get_project_stats("Unreal VsCode Helper").catch(() => ({}));
const project = {
_id: "633900a7471d8a488d9ab4a3",
name: "Unreal VsCode Helper",
description: i18nDict["Unreal VsCode Helper-Description"],
stats,
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
