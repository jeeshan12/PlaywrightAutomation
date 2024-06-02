import { expect, Page } from "@playwright/test";
import { SnapshotOptions } from "../model/snapshot-options";


export async function compareSnapshots(
	page: Page,
	name: string,
	fullPage: boolean = false,
	snapshotOptions: SnapshotOptions = {}
) {

	await page.evaluate(() => document.fonts.ready);
	let defaultSnapshotOptions: SnapshotOptions = {
		threshold: 0.2,
		maxDiffPixels: 1600,
		maxDiffPixelRatio: 0.2,
	};
	defaultSnapshotOptions = { ...defaultSnapshotOptions, ...snapshotOptions };
	await expect.soft(page).toHaveScreenshot(`${name}.png`, {
		...defaultSnapshotOptions,
		fullPage: fullPage,
	});
}
