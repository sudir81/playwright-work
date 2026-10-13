class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.shoppingCart = page.locator("#shopping_cart_container");
    this.checkoutButton = page.locator(".cart_footer > #checkout");

    this.fNameInput = page.getByPlaceholder("First Name");
    this.lNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.locator(".checkout_buttons > #continue");
  }

  async goToCartPage() {
    await this.shoppingCart.click();
  }

  async goToCheckoutPage() {
    await this.checkoutButton.click();
  }

  async fillCheckoutFormAndSubmit(firstName, lastName, postalCode) {
    await this.fNameInput.fill(firstName);
    await this.lNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
}

module.exports = { CheckoutPage };
