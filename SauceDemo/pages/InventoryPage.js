class InventoryPage {
  constructor(page) {
    this.page = page;

    this.inventoryItems = page.locator(".inventory_item");
    this.shoppingCart = page.locator(
      "#shopping_cart_container > a > .shopping_cart_badge",
    );
    this.sortDropDown = page.locator(".product_sort_container");
    this.productPrices = page.locator(".inventory_item_price");
  }

  async getInventoryItemsCount() {
    const count = await this.inventoryItems.count();
    return count;
  }

  async getFilteredInventoryItem(productName) {
    const product = this.inventoryItems.filter({ hasText: productName });
    return product;
  }

  async addProductToCart(productName) {
    const product = await this.getFilteredInventoryItem(productName);
    const addToCart = product.locator("button", { hasText: "Add to cart" });
    await addToCart.click();
  }

  async getCartCount() {
    const hasBadge = await this.shoppingCart.count();
    if (hasBadge === 0) {
      return 0;
    }
    return parseInt(await this.shoppingCart.textContent(), 10);
  }

  async sortBy(option) {
    await this.sortDropDown.selectOption(option);
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  };
}

module.exports = { InventoryPage };
