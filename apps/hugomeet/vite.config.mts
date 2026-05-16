import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/apps/hugomeet",
	envPrefix: ["VITE_", "NX_"],
	plugins: [react(), nxViteTsPaths()],
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	preview: {
		host: "0.0.0.0",
		port: 3000,
	},
	build: {
		outDir: "../../dist/apps/hugomeet",
		emptyOutDir: true,
	},
});
