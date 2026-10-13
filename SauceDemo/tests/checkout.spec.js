import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users, userDetails } from "../data/users";
import { appName, cart, inventory, checkout, checkoutOverview } from "../data/constants";

let loginPage, inventoryPage, cartPage, checkoutPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);

  await loginPage.open();

  await loginPage.login(
    users.standurdUser.username,
    users.standurdUser.password,
  );

  await inventoryPage.addProductToCart(inventory.products[0]);
  await inventoryPage.addProductToCart(inventory.products[1]);

  await cartPage.goToCartPage();
  await checkoutPage.goToCheckoutPage();
});

test("Verify the url of the checkout page", async ({ page }) => {
  await expect(page.url()).toBe(`${loginPage.baseUrl}${checkout.url}`);
  await expect(page.locator(".title")).toHaveText(checkout.title);
});

test("Verify checkout/continue button visibility", async ({ page }) => {
  await expect(checkoutPage.continueButton).toBeVisible();
});

test("Fill checkout form and submit", async ({ page }) => {
    await checkoutPage.fillCheckoutFormAndSubmit(
        userDetails.standurdUser.firstName,
        userDetails.standurdUser.lastName,
        userDetails.standurdUser.postalCode
    );

    
  await expect(page.url()).toBe(`${loginPage.baseUrl}${checkoutOverview.url}`);
});