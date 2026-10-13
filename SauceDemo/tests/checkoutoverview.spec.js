import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { users, userDetails } from "../data/users";
import {
  appName,
  cart,
  inventory,
  checkout,
  checkoutOverview,
} from "../data/constants";

let loginPage, inventoryPage, cartPage, checkoutPage, checkoutOverviewPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);

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
});

test("Verify the url of the checkout overview page", async ({ page }) => {
  await expect(page.url()).toBe(`${loginPage.baseUrl}${checkoutOverview.url}`);
  await expect(page.locator(".title")).toHaveText(checkoutOverview.title);
});

test("Verify Finish button visibility", async ({ page }) => {
  await expect(checkoutOverviewPage.finishButton).toBeVisible();
});

test("Verify cart items count", async ({ page }) => {
  const cartItemsCount = await checkoutOverviewPage.getCartCount();
  await expect(cartItemsCount).toBe(2);
});

test("Verify cart items list", async ({ page }) => {
  const cartItemsNames = await checkoutOverviewPage.getAllCartItemsNames();
  await expect(cartItemsNames).toEqual([
    inventory.products[0],
    inventory.products[1],
  ]);
});

test("verify payment information", async ({ page }) => {
//   const paymentInfoLocator = checkoutOverviewPage.paymentInfo;
  const paymentInfoText = await page.locator('.summary_info > .summary_value_label').nth(0).textContent();
  await expect(paymentInfoText).toBe("SauceCard #31337");
});

test("verify shipping information", async ({ page }) => {
//   const shippingInfoLocator = checkoutOverviewPage.shippingInfo;
  const shippingInfoText = await page.locator('.summary_info > .summary_value_label').nth(1).textContent();
  await expect(shippingInfoText).toBe("Free Pony Express Delivery!");
});

test("Verify Item total price", async ({ page }) => {
    let totalPrice = await checkoutOverviewPage.getTotalItemsPrice();
    const itemTotalText = await page.locator('.summary_info > .summary_subtotal_label').textContent();
    const itemTotalValue = parseFloat(itemTotalText.replace('Item total: $', ''));
    await expect(itemTotalValue).toBeCloseTo(totalPrice, 2);
});

test("Verify tax amount", async ({ page }) => {
    const taxAmount = await checkoutOverviewPage.getItemsTaxAmount();
    const taxText = await page.locator('.summary_info > .summary_tax_label').textContent();
    const taxValue = parseFloat(taxText.replace('Tax: $', ''));
    await expect(taxValue).toBeCloseTo(taxAmount, 2);
});

test("Verify total amount", async ({ page }) => {
    const totalAmount = await checkoutOverviewPage.getTotalPrice();
    const totalText = await page.locator('.summary_info > .summary_total_label').textContent();
    const totalValue = parseFloat(totalText.replace('Total: $', ''));
    await expect(totalValue).toBeCloseTo(totalAmount, 2);
});
