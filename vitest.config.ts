import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		testTimeout: 20000,
	},
});
