import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/ProjectApi";
import { i18nDict } from "Utils/i18nDict";

import HugoMeetExperienceCanvas from "./HugoMeetExperienceCanvas";

export default async function ProjectsPage() {
const stats = await ProjectApiRoutes.get_project_stats("HugoMeet").catch(() => ({}));
const project = {
_id: "6338ffeb5e00275fb5051c9e",
name: "HugoMeet",
description: i18nDict["HugoMeet-Description"],
stats,
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
