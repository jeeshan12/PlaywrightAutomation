import { test as login } from "@playwright/test";

const authFile = ".auth/login.json";
const USERNAME = "standard_user" || process.env.USERNAME;
const PASSWORD = "secret_sauce" || process.env.PASSWORD;
login("Save  Storage state", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("username").fill(USERNAME);
  await page.getByTestId("password").fill(PASSWORD);
  await page.getByTestId("login-button").click();
  await page.context().storageState({
    path: authFile,
  });
});
