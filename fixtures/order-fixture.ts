import { test as base } from "@playwright/test";
import { ProductPage } from "../pages/product-page";
import { OverviewPage } from "../pages/overview-page";
import { CustomerInformationPage } from "../pages/customer-information-page";
import { CartPage } from "../pages/cart-page";
import { CompletePage } from "../pages/complete-page";

type OrderFixture = {
  productPage: ProductPage;
  overviewPage: OverviewPage;
  customerInformationPage: CustomerInformationPage;
  cartPage: CartPage;
  completePage: CompletePage;
};

export const test = base.extend<OrderFixture>({
  page: async ({ page }, use) => {
    await page.goto("/inventory.html");
    await use(page);
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  customerInformationPage: async ({ page }, use) => {
    await use(new CustomerInformationPage(page));
  },

  overviewPage: async ({ page }, use) => {
    await use(new OverviewPage(page));
  },

  completePage: async ({ page }, use) => {
    await use(new CompletePage(page));
  },
});

export { expect } from '@playwright/test';

