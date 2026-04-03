import { I18nDictValue } from "Utils/i18nDict";

export interface IProject {
	name: string;
	description: I18nDictValue;
}

export const projects: Record<string, IProject> = {
	"HugoMeet": {
		name: "HugoMeet",
		description: {
			en: "HugoMeet is a video meeting platform, that I made to learn how to use WebRTC and video/audio streaming.",
			fr: "HugoMeet est une plateforme de visioconférence, que j'ai réalisé pour apprendre à utiliser WebRTC et le streaming de vidéo et de son."
		}
	},
	"Unreal VsCode Helper": {
		name: "Unreal VsCode Helper",
		description: {
			en: "UVCH is a VSCode extension that provides a set of tools to help you develop Unreal Engine projects inside VsCode.",
			fr: "UVCH est une extension VSCode qui met a disposition plusieurs outils pour vous aidez à déveloper pour Unreal Engine avec VsCode."
		}
	},
	"Procedural Terrain": {
		name: "Procedural Terrain",
		description: {
			en: "This is an Unreal Engine components who's allowing you to generate infinite terrain in any of your game. (Like Minecraft)",
			fr: "Ceci est un actor dans Unreal Engine qui permet de crée des terrains à l'infinit dans nimporte le quelle de vos jeux (Un peut comme Minecraft)"
		}
	}
};

export function getProject(name: string): IProject | undefined {
	return projects[name];
}
