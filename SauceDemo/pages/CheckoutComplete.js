class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator(".cart_item");
    this.completeMsg = page.locator("#checkout_complete_container > .complete-header");
    this.completeSubMsg = page.locator("#checkout_complete_container > .complete-text");
    this.backHomeBtn = page.locator("#checkout_complete_container > .complete-buttons > #back-to-products");
    this.genPdfBtn = page.locator("#checkout_complete_container > .complete-buttons > #generate-pdf-order");
  }

  async goToCartPage() {
    await this.shoppingCart.click();
  }

  async goToCheckoutPage() {
    await this.checkoutButton.click();
  }
}

module.exports = { CheckoutCompletePage };