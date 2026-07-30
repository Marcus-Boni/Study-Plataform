import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Config separada de propósito: os plugins `tanstackStart()` e `nitro()` do
 * vite.config.ts montam um servidor e não funcionam sob o runner de teste.
 * Aqui ficam só React + jsdom, que é o necessário para testar componentes.
 */
export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [viteReact()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		coverage: {
			provider: "v8",
			include: ["src"],
			exclude: [
				"src/routeTree.gen.ts",
				"src/**/*.{test,spec}.{ts,tsx}",
				"src/components/ui/**",
			],
			reporter: ["text", "html"],
		},
	},
});
