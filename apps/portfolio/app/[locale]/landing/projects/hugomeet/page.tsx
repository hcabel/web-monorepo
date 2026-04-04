import Project from "App/[locale]/landing/(elements)/project/Projects";
import { Routes as ProjectApiRoutes } from "@hcabel/bridges/CachingApi";

import HugoMeetExperienceCanvas from "./HugoMeetExperienceCanvas";

export default async function ProjectsPage() {
	const stats = await ProjectApiRoutes.get_project_stats("HugoMeet");
	return (
		<>
			<HugoMeetExperienceCanvas />
			<Project
				name="HugoMeet"
				stats={stats}
				moreButtonRedirection={"/redirects/hugomeet"}
				moreTextOverride={"Go to HugoMeet"}
				i18n
			/>
		</>
	);
}

export const revalidate = 86400; /* each day */

// Tell nextjs to pre-render the pages where the dynamic params [locale] is "en" and "fr"
export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fr" }];
}
