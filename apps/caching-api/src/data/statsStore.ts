import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { IStats } from '@hcabel/types/CachingApi';

export type IAllStats = Record<string, IStats>;

const RAW_STATS_FILE_PATH = process.env.STATS_FILE_PATH || path.join(__dirname, 'stats.json');

// Node's `fs` does not expand a leading `~` (that is a shell feature), so we
// resolve it manually to the current user's home directory.
const STATS_FILE_PATH = RAW_STATS_FILE_PATH.startsWith('~')
	? path.join(os.homedir(), RAW_STATS_FILE_PATH.slice(1))
	: RAW_STATS_FILE_PATH;

export function loadStats(): IAllStats {
	try {
		const data = fs.readFileSync(STATS_FILE_PATH, 'utf-8');
		return JSON.parse(data) as IAllStats;
	} catch (error) {
		console.error(`Failed to load stats from ${STATS_FILE_PATH}:`, error);
		throw new Error('Stats data unavailable');
	}
}

export function getProjectStats(projectName: string): IStats | null {
	const allStats = loadStats();
	return allStats[projectName] || null;
}
