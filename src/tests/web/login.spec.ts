import { test } from "src/fixtures/order-fixture";
import { compareSnapshots } from "src/utils/visual-utils";
test.describe("Snapshot tests for Swag Labs", async () => {
  test(
    "Visual Test for Swag Store @visual",
    {
      tag: "@visual",
    },
    async ({ page }) => {
      await compareSnapshots(page, "swag-store", true);
    },
  );
});
