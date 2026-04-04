import { II18nText } from '../i18n.interface';

export interface IStat {
	name: II18nText;
	value: number;
	url: string;
}

export interface IStats {
	[platform: string]: IStat[];
}

export type IRouteGetAllProjectPlatformStats = IStat[];

export type IRouteGetProjectStat = IStat;

export type IRouteGetProjectStats = IStats;