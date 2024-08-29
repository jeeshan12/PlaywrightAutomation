import type { Locator, Page } from "@playwright/test";
import { step } from "@utils/step-decorator";
import type { CustomerInformation } from "../model/information";

export class CustomerInformationPage {
  readonly firstName: Locator = this.page.getByTestId("firstName");
  readonly lastName: Locator = this.page.getByTestId("lastName");
  readonly postalCode: Locator = this.page.getByTestId("postalCode");
  readonly cancelButton: Locator = this.page.getByTestId("cancel");
  readonly continueButton: Locator = this.page.getByTestId("continue");

  constructor(protected page: Page) {}
  @step("Add customer information")
  async enterInformation(customerInformation: CustomerInformation) {
    await this.firstName.fill(customerInformation.firstName);
    await this.lastName.fill(customerInformation.lastName);
    await this.postalCode.fill(customerInformation.postalCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }
}
