import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import mkcert from "vite-plugin-mkcert";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		define: {
			"process.env": env,
		},
		base: "/",
		plugins: [
			react(),
			viteTsconfigPaths(),
			svgr(),
			eslint(),
			mkcert(),
			checker({
				typescript: true,
			}),
		],
		server: {
			open: true,
			port: 3000,
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./src/setupTests.ts",
			css: true,
			reporters: ["verbose"],
			coverage: {
				reporter: ["text", "json", "html"],
				include: ["src/**/*"],
				exclude: [],
			},
		},
	};
});
