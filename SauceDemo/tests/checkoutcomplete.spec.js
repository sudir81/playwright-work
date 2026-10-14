import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutComplete";
import { users, userDetails } from "../data/users";
import {
  appName,
  cart,
  inventory,
  checkout,
  checkoutComplete,
} from "../data/constants";

let loginPage, inventoryPage, cartPage, checkoutPage, checkoutOverviewPage, checkoutCompletePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  checkoutCompletePage = new CheckoutCompletePage(page);
  await loginPage.open();

  await loginPage.login(
    users.standurdUser.username,
    users.standurdUser.password,
  );

  await inventoryPage.addProductToCart(inventory.products[0]);
  await inventoryPage.addProductToCart(inventory.products[1]);

  await cartPage.goToCartPage();
  await checkoutPage.goToCheckoutPage();

  await checkoutPage.fillCheckoutFormAndSubmit(
    userDetails.standurdUser.firstName,
    userDetails.standurdUser.lastName,
    userDetails.standurdUser.postalCode,
  );

  await checkoutOverviewPage.finishButton.click();
});

test("Verify the url of the checkout complete page", async ({ page }) => {
  await expect(page.url()).toBe(`${loginPage.baseUrl}${checkoutComplete.url}`);
  await expect(page.locator(".title")).toHaveText(checkoutComplete.title);
});

test("Verify checkout complete page top bar", async ({ page }) => {
  const locator = page.locator(".app_logo");
  await expect(locator).toHaveText(appName);
});

test("Verify checkout complete message", async ({ page }) => {
    await expect(checkoutCompletePage.completeMsg).toHaveText(checkoutComplete.message);
    await expect(checkoutCompletePage.completeSubMsg).toHaveText(checkoutComplete.subMessage);
});

test("Verify Back Home button visibility", async ({ page }) => {
    await expect(checkoutCompletePage.backHomeBtn).toBeVisible();
    await expect(checkoutCompletePage.backHomeBtn).toHaveText(checkoutComplete.backButtonText);
});

test("Verify Generate PDF button visibility", async ({ page }) => {
    await expect(checkoutCompletePage.genPdfBtn).toBeVisible();
    await expect(checkoutCompletePage.genPdfBtn).toHaveText(checkoutComplete.generatePdfButtonText);
});