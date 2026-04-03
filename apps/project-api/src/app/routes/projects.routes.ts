import Express from "express";
import { IRequestResponse } from "@hcabel/rest-api-utils";
import {
	IRouteGetAllProjects,
	IRouteGetProjectById,
} from "@hcabel/types/ProjectApi";
import { getStatsForProject } from "../../data/reader";

const PROJECTS = [
	{
		_id: "6338ffeb5e00275fb5051c9e",
		name: "HugoMeet",
		description: {
			en: "HugoMeet is a video meeting platform, that I made to learn how to use WebRTC and video/audio streaming.",
			fr: "HugoMeet est une plateforme de visioconférence, que j'ai réalisé pour apprendre à utiliser WebRTC et le streaming de vidéo et de son."
		}
	},
	{
		_id: "633900a7471d8a488d9ab4a3",
		name: "Unreal VsCode Helper",
		description: {
			en: "UVCH is a VSCode extension that provides a set of tools to help you develop Unreal Engine projects inside VsCode.",
			fr: "UVCH est une extension VSCode qui met a disposition plusieurs outils pour vous aidez à déveloper pour Unreal Engine avec VsCode."
		}
	},
	{
		_id: "6339018aa4c9d89b6ed06751",
		name: "Procedural Terrain",
		description: {
			en: "This is an Unreal Engine components who's allowing you to generate infinite terrain in any of your game. (Like Minecraft)",
			fr: "Ceci est un actor dans Unreal Engine qui permet de crée des terrains à l'infinit dans nimporte le quelle de vos jeux (Un peut comme Minecraft)"
		}
	}
];

export async function get_all_projects(
	req: Express.Request
): Promise<IRequestResponse<IRouteGetAllProjects>> {
	const filter = req.query;

	const filteredProjects = PROJECTS.filter((project) => {
		for (const key in filter) {
			if (
				!Object.prototype.hasOwnProperty.call(project, key) ||
				(project as Record<string, unknown>)[key] !== filter[key]
			) {
				return false;
			}
		}
		return true;
	});

	return {
		status: 200,
		json: filteredProjects,
	};
}

export async function get_project_by_id(
	req: Express.Request
): Promise<IRequestResponse<IRouteGetProjectById>> {
	const { id } = req.params;

	if (!id) {
		return {
			status: 400,
			json: {
				error: "Invalid inputs",
			},
		};
	}

	const project = PROJECTS.find((p) => p._id === id);
	if (!project) {
		return {
			status: 404,
			json: {
				error: "Project not found",
			},
		};
	}

	const stats = getStatsForProject(id);

	return {
		status: 200,
		json: {
			...project,
			stats,
		},
	};
}
