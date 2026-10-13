class LoginPage {
    constructor(page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL;

        //Locators
        this.userInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async open() {
        console.log(`Navigating to ${this.baseUrl}`);
        await this.page.goto(this.baseUrl);
        console.log(`Current URL: ${this.page.url()}`);
    }

    async login(username, password) {
        await this.userInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };