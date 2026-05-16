/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly NX_HUGOMEET_ENDPOINT?: string;
	readonly NX_HUGOMEET_SS_ENDPOINT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
