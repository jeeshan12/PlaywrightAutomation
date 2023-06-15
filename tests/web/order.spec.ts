import { test, expect } from "../../fixtures/order-fixture";
import { DataFactory } from "../../data/datafactory";
const ITEM_ONE_INDEX = 0;
const ITEM_TWO_INDEX = 1;
test("Place Order", async ({
  productPage,
  cartPage,
  customerInformationPage,
  overviewPage,
  completePage,
}) => {
  await productPage.clickAddToCartButton(ITEM_ONE_INDEX);
  await productPage.clickAddToCartButton(ITEM_TWO_INDEX);
  await expect(productPage.shoppingCartLink).toHaveText("2");
  await productPage.clickShoppingCartLink();
  const firstItemCost = await cartPage.cartItemPrice(0).innerText();
  const secondItemCost = await cartPage.cartItemPrice(1).innerText();
  await cartPage.clickCheckOutButton();
  await customerInformationPage.enterInformation(
    DataFactory.getCustomerInformation()
  );
  await customerInformationPage.clickContinueButton();
  await expect(overviewPage.cartItemPrice(ITEM_ONE_INDEX)).toHaveText(
    firstItemCost
  );
  await expect(overviewPage.cartItemPrice(ITEM_TWO_INDEX)).toHaveText(
    secondItemCost
  );
  await overviewPage.clickFinishButton();
  await expect(completePage.orderCompleteMessage).toHaveText(
    "Thank you for your order!"
  );
  await expect(completePage.orderCompleteTextMessage).toHaveText(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
  );
});
