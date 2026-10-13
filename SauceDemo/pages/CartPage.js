class CartPage {
  constructor(page) {
    this.page = page;
    this.shoppingCart = page.locator(
      "#shopping_cart_container",
    );
    this.cartItems = page.locator(".cart_item");
    this.cartItemsNames = page.locator(".cart_item_label > a > .inventory_item_name");
  }

  async goToCartPage() {
    await this.shoppingCart.click();
  }

  async getCartCount() {
    const hasBadge = await this.shoppingCart.count();
    if (hasBadge === 0) {
      return 0;
    }
    return parseInt(await this.shoppingCart.textContent(), 10);
  }

  async getAllCartItemsNames() {
    const items = await this.cartItemsNames.allTextContents();
    return items;
  }

  async getFilteredCartItem(productName) {
    const product = this.cartItems.filter({ hasText: productName });
    return product;
  }

  async isCartItemPresent(productName) {
    const product = await this.getFilteredCartItem(productName);
    return await product.count() > 0;
  }

  async getCartItemQuantity(productName) {
    const product = await this.getFilteredCartItem(productName);
    const quantityLocator = product.locator(".cart_quantity");
    const quantity = await quantityLocator.textContent();
    return parseInt(quantity, 10);
  }

  async removeProductFromCart(productName) {
    const product = await this.getFilteredCartItem(productName);
    return product.locator("button", { "hasText": "Remove" });
  }
}

module.exports = { CartPage };
