import { defineConfig, devices } from "@playwright/test";
const date = new Date().toISOString();
const outputDir = `./results/${date}`;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		["list"],
		[
			"monocart-reporter",
			{
				name: "My Test Report",
				outputFile: `${outputDir}/index.html`,
			},
		],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	snapshotPathTemplate:
		"{testDir}/__screenshots__/{platform}/{projectName}/{testFileName}/{arg}{ext}",
	use: {
		baseURL: "https://www.saucedemo.com/",
		testIdAttribute: "data-test",
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},

	projects: [
		{ name: "login", testMatch: "login.setup.ts", testDir: "./src/setup/" },
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				storageState: "./.auth/login.json",
			},
			testDir: "./src/tests/web/",
			dependencies: ["login"],
		},

		{
			name: "api",
			testDir: "./src/tests/api/",
		},
	],
});
