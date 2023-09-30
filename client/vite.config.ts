import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import {rmSync} from "node:fs";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
	rmSync("build/electron", {recursive: true, force: true});

	const isServe = command === "serve";
	const isBuild = command === "build";
	const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

	process.env = {...process.env, ...loadEnv(mode, process.cwd())};

	return {
		server: {
			port: 3678,
		},
		resolve: {
			alias: {
				"@": `${__dirname}/src`,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "src/styles/variables.scss";',
				},
			},
		},
		...(mode !== "host" && {
			build: {
				outDir: "build/app",
				emptyOutDir: true,
			},
		}),
		plugins: [
			vue(),
			mode !== "host" &&
			electron([
				{
					entry: "electron/main.ts",
					onstart(options) {
						process.env.VSCODE_DEBUG
							? console.log(
								/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
							)
							: options.startup();
					},
					vite: {
						build: {
							sourcemap,
							minify: isBuild,
							outDir: "build/electron",
							rollupOptions: {},
						},
					},
				},
				{
					entry: "electron/preload.ts",
					onstart(options) {
						options.reload();
					},
					vite: {
						build: {
							sourcemap: sourcemap ? "inline" : undefined, // #332
							minify: isBuild,
							outDir: "build/electron",
							rollupOptions: {},
						},
					},
				},
			]),
			mode !== "host" && renderer(),
		].filter(Boolean),
		clearScreen: true,
	};
});