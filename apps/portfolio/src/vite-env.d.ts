/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly NX_PORTFOLIO_ENDPOINT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
