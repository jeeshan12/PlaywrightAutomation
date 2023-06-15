import { Locator } from "@playwright/test";

type HamburgerMenuItems = "All Items" | "Reset App State" | "Logout" | "About";

export class HamburgerPageComponent {
  readonly closeButton: Locator = this.root.locator("button", {
    hasText: "Close Menu",
  });

  readonly hamburgerMenu: Locator = this.root.locator("button", {
    hasText: "Open Menu",
  });

  readonly hamburgerItems = (itemName: HamburgerMenuItems): Locator =>
    this.root.locator("a", {
      hasText: itemName,
    });
  constructor(protected root: Locator) {}

  async clickHamburgerItems(itemName: HamburgerMenuItems): Promise<void> {
    await this.hamburgerItems(itemName).click();
  }

  async clickHamburgerMenuButton(): Promise<void> {
    await this.hamburgerMenu.click();
  }

  async clickCloseButton(): Promise<void>  {
    await this.closeButton.click();
  }
}
