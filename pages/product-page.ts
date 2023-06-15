import { Locator, Page } from "@playwright/test";
import { HamburgerPageComponent } from "../pagecomponents/hamburger-pagecomponent";
export class ProductPage {
  readonly productsList: Locator = this.page.locator(`.inventory_item`);
  readonly addToCartButton = (index: number): Locator =>
    this.productsList.nth(index).getByRole("button");
  readonly hamburgerComponent = new HamburgerPageComponent(
    this.page.locator(`.header_container`)
  );
  readonly shoppingCartLink = this.page.locator(`#shopping_cart_container`);
  constructor(protected page: Page) {}

  async clickAddToCartButton(index: number): Promise<void>  {
    await this.addToCartButton(index).click();
  }
  async clickShoppingCartLink(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
