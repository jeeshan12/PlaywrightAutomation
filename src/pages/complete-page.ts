import type { Page } from "@playwright/test";

export class CompletePage {
  readonly orderCompleteMessage = this.page.locator(`.complete-header`);
  readonly orderCompleteTextMessage = this.page.locator(`.complete-text`);

  constructor(protected page: Page) {}
}
