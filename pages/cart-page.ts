import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly continueShoppingButton: Locator = this.page.getByTestId(`continue-shopping`);
  readonly checkoutButton: Locator = this.page.getByTestId(`checkout`);
  readonly carItems: Locator = this.page.locator(`.cart_item`);
  readonly cartQuantity = (index: number): Locator =>
    this.carItems.nth(index).locator(".cart_quantity");
  readonly cartItemName = (index: number): Locator =>
    this.carItems.nth(index).locator(".inventory_item_name");
  readonly cartItemDescription = (index: number): Locator =>
    this.carItems.nth(index).locator(".inventory_item_desc");
  readonly cartItemPrice = (index: number): Locator =>
    this.carItems.nth(index).locator(".inventory_item_price");
  readonly removeButton = (index: number): Locator =>
    this.carItems.nth(index).locator("button");

  constructor(protected page: Page) {}


  async clickCheckOutButton() {
    await this.checkoutButton.click();
  }
}
