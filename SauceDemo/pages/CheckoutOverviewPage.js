class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.shoppingCart = page.locator("#shopping_cart_container");

    this.cartItems = page.locator(".cart_item");
    this.cartItemsNames = page.locator(
      ".cart_item_label > a > .inventory_item_name",
    );
    this.productPrices = page.locator('[data-test="inventory-item-price"]');

    this.paymentInfo = page.locator(".summary_info > .summary_value_label").nth(0);
    this.shippingInfo = page.locator(".summary_info > .summary_value_label").nth(1);
    this.finishButton = page.locator(".cart_footer > #finish");
  }

  async goToCartPage() {
    await this.shoppingCart.click();
  }

  async goToCheckoutPage() {
    await this.checkoutButton.click();
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

  async fillCheckoutFormAndSubmit(firstName, lastName, postalCode) {
    await this.fNameInput.fill(firstName);
    await this.lNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  };

  async getTotalItemsPrice() {
    let prices = await this.getProductPrices();
    const totalPrice = prices.reduce((acc, price) => acc + price, 0);
    return totalPrice;
  }

  async getItemsTaxAmount() {
    const taxAmount = await this.getTotalItemsPrice() * 0.08;
    return taxAmount;
  }

  async getTotalPrice() {
    const totalPrice = await this.getTotalItemsPrice() + await this.getItemsTaxAmount();
    return totalPrice;
  }
}

module.exports = { CheckoutOverviewPage };
