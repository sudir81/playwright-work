import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../data/users";
import { appName, urls, inventory } from "../data/constants";

let loginPage, inventoryPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.open();

  await loginPage.login(
    users.standurdUser.username,
    users.standurdUser.password,
  );
});

test("Verify the url of the inventory page", async ({ page }) => {
  await expect(page.url()).toBe(`${loginPage.baseUrl}${urls.inventory}`);
  await expect(page.locator(".title")).toHaveText(inventory.title);
});

test("Verify inventory page top bar", async ({ page }) => {
  const locator = page.locator(".app_logo");
  await expect(locator).toHaveText(appName);

  // Verify the burger menu button
  const burgerMenuButton = page.locator(".bm-burger-button");
  await expect(burgerMenuButton).toBeVisible();

  // Verify the shopping cart button
  const shoppingCartButton = page.locator("#shopping_cart_container");
  await expect(shoppingCartButton).toBeVisible();
});

test("Verify products count", async ({ page }) => {
  const itemCount = await inventoryPage.getInventoryItemsCount();
  await expect(itemCount).toBe(6);
});

test("Verify products list", async ({ page }) => {
  for (const productName of inventory.products) {
    const product = await inventoryPage.getFilteredInventoryItem(productName);
    await expect(product).toBeVisible();
  }
});

test("Add product to cart", async ({ page }) => {
  const product1 = await inventoryPage.getFilteredInventoryItem(
    inventory.products[0],
  );
  await expect(product1).toBeVisible();

  await inventoryPage.addProductToCart(inventory.products[0]);
  await inventoryPage.addProductToCart(inventory.products[1]);

  // Verify the shopping cart button shows the correct number of items
  const cartCount = await inventoryPage.getCartCount();
  await expect(cartCount).toBe(2);
});

test("Verify sorting functionality", async ({ page }) => {
  // Sort by price low to high
  await inventoryPage.sortBy(inventory.sortOptions.lohi);
  let prices = await inventoryPage.getProductPrices();
  let sortedPrices = [...prices].sort((a, b) => a - b);
  await expect(prices).toEqual(sortedPrices);
});

test("Verify inventory page footer", async ({ page }) => {
  const locator = page.locator(".footer_copy");
  await expect(locator).toHaveText(inventory.footerText);
});
