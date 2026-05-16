import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

		return {
			root: __dirname,
			publicDir: "src/public",
			plugins: [react()],
			esbuild: {
				loader: "jsx",
				include: /src\/.*\.js$/,
				exclude: [],
			},
			optimizeDeps: {
				esbuildOptions: {
					loader: {
						".js": "jsx",
					},
				},
			},
			define: {
				"process.env.NX_HUGOMEET_ENDPOINT": JSON.stringify(
					env.NX_HUGOMEET_ENDPOINT ?? ""
				),
			"process.env.NX_HUGOMEET_SS_ENDPOINT": JSON.stringify(
				env.NX_HUGOMEET_SS_ENDPOINT ?? ""
			),
		},
		server: {
			host: "0.0.0.0",
			port: 3000,
		},
		preview: {
			host: "0.0.0.0",
			port: 3000,
		},
		build: {
			outDir: path.resolve(__dirname, "../../../dist/apps/frontend/hugomeet"),
			emptyOutDir: true,
		},
	};
});
