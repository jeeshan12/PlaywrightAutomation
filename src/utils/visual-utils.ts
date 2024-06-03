import { expect, type Page } from "@playwright/test";
import type { SnapshotOptions } from "@model/snapshot-options";

export async function compareSnapshots(
  page: Page,
  name: string,
  fullPage = false,
  snapshotOptions: SnapshotOptions = {},
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
