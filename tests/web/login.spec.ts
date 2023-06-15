import { test } from "../../fixtures/order-fixture";
import { compareSnapshots } from "../../utils/visual-utils";
test.describe("Snapshot tests for Swag Labs", async () => {
  test("Visual Test for Swag Store @visual", async ({  page }) => {
    
    await compareSnapshots(page, 'swag-store', true);
  });
});
