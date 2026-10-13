import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { users } from "../data/users";
import { appName, cart, inventory } from "../data/constants";

let loginPage, inventoryPage, cartPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);

  await loginPage.open();

  await loginPage.login(
    users.standurdUser.username,
    users.standurdUser.password,
  );

  await inventoryPage.addProductToCart(inventory.products[0]);
  await inventoryPage.addProductToCart(inventory.products[1]);

  await cartPage.goToCartPage();
});

test("Verify the url of the cart page", async ({ page }) => {
  await expect(page.url()).toBe(`${loginPage.baseUrl}${cart.url}`);
  await expect(page.locator(".title")).toHaveText(cart.title);
});

test("Verify cart page top bar", async ({ page }) => {
  const locator = page.locator(".app_logo");
  await expect(locator).toHaveText(appName);

  // Verify the burger menu button
  const burgerMenuButton = page.locator(".bm-burger-button");
  await expect(burgerMenuButton).toBeVisible();

  // Verify the shopping cart button
  const shoppingCartButton = page.locator("#shopping_cart_container");
  await expect(shoppingCartButton).toBeVisible();
});

test("Verify cart item count", async ({ page }) => {
  // Verify the shopping cart button shows the correct number of items
  const cartCount = await cartPage.getCartCount();
  await expect(cartCount).toBe(2);
});

test("Verify cart items list", async ({ page }) => {
  const cartItems = await cartPage.getAllCartItemsNames();
  await expect(cartItems).toEqual([
    inventory.products[0],
    inventory.products[1],
  ]);
});

test("Verify cart has 2 quantity of Product 1", async ({ page }) => {
  //   await inventoryPage.addProductToCart(inventory.products[0]);
  const cartItems = await cartPage.getAllCartItemsNames();
  await expect(cartItems).toEqual([
    inventory.products[0],
    inventory.products[1],
  ]);

  const product1Quantity = await cartPage.getCartItemQuantity(
    inventory.products[0],
  );
  const product2Quantity = await cartPage.getCartItemQuantity(
    inventory.products[1],
  );
  await expect(product1Quantity).toBe(1);
  await expect(product2Quantity).toBe(1);
});

test("Remove product from cart", async ({ page }) => {
  const initialCartItems = await cartPage.getAllCartItemsNames();
  await expect(initialCartItems).toEqual([
    inventory.products[0],
    inventory.products[1],
  ]);

  const removeButton = await cartPage.removeProductFromCart(
    inventory.products[0],
  );
  await removeButton.click();

  const cartCount = await cartPage.getCartCount();
  await expect(cartCount).toBe(1);

  const cartItems = await cartPage.getAllCartItemsNames();
  await expect(cartItems).toEqual([inventory.products[1]]);
});
