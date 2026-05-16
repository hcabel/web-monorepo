import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { builtinModules } from "node:module";
import { defineConfig } from "vite";

export default defineConfig({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/apps/caching-api",
	plugins: [nxViteTsPaths()],
	build: {
		ssr: "src/server.ts",
		target: "node20",
		outDir: "../../dist/apps/caching-api",
		emptyOutDir: true,
		sourcemap: true,
		minify: false,
		reportCompressedSize: true,
		rollupOptions: {
			external: [
				...builtinModules,
				...builtinModules.map((moduleName) => `node:${moduleName}`),
				"express",
				"helmet",
			],
			output: {
				entryFileNames: "server.js",
				format: "cjs",
			},
		},
	},
});
