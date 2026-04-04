import { Locales } from "App/[locale]/LocaleContext";

export type I18nDictValue = { [locale in Locales]: string };
export type I18nDict = { [locale: string]: I18nDictValue };

/**
 * Fetch translated text from the i18nDict.json file.
 * The text is fetch using the key and the locale provided.
 * @param key the key to fetch the text from the i18nDict.json file
 * @param locale the locale to fetch the text from the i18nDict.json file
 * @returns the translated text in the locale provided
 */
export function GetI18nDictValue(key: string, locale: Locales): string {
	const value = (i18nDict as any)[key]?.[locale] || null;
	if (value === null) {
		throw new Error(`i18n key "${key}" not found in locale "${locale}"`);
	}
	return value;
}

export const i18nDict: I18nDict = {
	MyJob: {
		en: "Software Engineer",
		fr: "Ingénieur logiciel",
	},
	"MyProjects-Title": {
		en: "My projects",
		fr: "Mes projets",
	},
	MoreDetails: {
		en: "More details",
		fr: "Plus de détails",
	},
	"Go to HugoMeet": {
		en: "Go to HugoMeet",
		fr: "Aller sur HugoMeet",
	},
	"HugoMeet-Description": {
		en: "HugoMeet is a video meeting platform, that I made to learn how to use WebRTC and video/audio streaming.",
		fr: "HugoMeet est une plateforme de visioconférence, que j'ai réalisé pour apprendre à utiliser WebRTC et le streaming de vidéo et de son.",
	},
	"Unreal VsCode Helper-Description": {
		en: "UVCH is a VSCode extension that provides a set of tools to help you develop Unreal Engine projects inside VsCode.",
		fr: "UVCH est une extension VSCode qui met à disposition plusieurs outils pour vous aider à développer pour Unreal Engine avec VsCode.",
	},
	"Procedural Terrain-Description": {
		en: "This is an Unreal Engine component that allows you to generate infinite terrain in any of your games. (Like Minecraft)",
		fr: "Ceci est un actor dans Unreal Engine qui permet de créer des terrains à l'infini dans n'importe lequel de vos jeux (Un peu comme Minecraft)",
	},
};
