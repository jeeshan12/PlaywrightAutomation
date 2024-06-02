import type { Page, Locator } from "@playwright/test";

export class OverviewPage {
  readonly carItems: Locator = this.page.locator(`.cart_item`);
  readonly cartQuantity = (index: number): Locator =>
    this.carItems.nth(index).locator(".cart_quantity");
  readonly cartItemName = (index: number): Locator =>
    this.carItems.nth(index).locator(".inventory_item_name");
  readonly cartItemDescription = (index: number): Locator =>
    this.carItems.nth(index).locator(".inventory_item_desc");
  readonly cartItemPrice = (index: number): Locator =>
    this.carItems.nth(index).locator(".inventory_item_price");
  readonly cancelButton: Locator = this.page.getByTestId(`cancel`);
  readonly finishButton: Locator = this.page.getByTestId(`finish`);
  readonly subtotal: Locator = this.page.locator(`.summary_subtotal_label`);
  readonly tax: Locator = this.page.locator(`.summary_tax_label`);
  readonly total: Locator = this.page.locator(
    `.summary_info_label.summary_total_label`,
  );
  constructor(protected page: Page) {}

  async clickFinishButton() {
    await this.finishButton.click();
  }
}
