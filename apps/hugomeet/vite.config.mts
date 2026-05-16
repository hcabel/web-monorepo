import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, "../.."), "");

	return {
		root: __dirname,
		cacheDir: "../../node_modules/.vite/apps/hugomeet",
		publicDir: "src/public",
		plugins: [react(), nxViteTsPaths()],
		define: {
			"process.env.NX_HUGOMEET_ENDPOINT": JSON.stringify(
				env.NX_HUGOMEET_ENDPOINT
			),
			"process.env.NX_HUGOMEET_SS_ENDPOINT": JSON.stringify(
				env.NX_HUGOMEET_SS_ENDPOINT
			),
		},
		server: {
			host: "localhost",
			port: 3000,
		},
		preview: {
			host: "localhost",
			port: 4300,
		},
		build: {
			outDir: "../../dist/apps/hugomeet",
			emptyOutDir: true,
			reportCompressedSize: true,
			commonjsOptions: {
				transformMixedEsModules: true,
			},
		},
	};
});
