import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';
import { appName, urls, inventory } from '../data/constants';


let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
});

test('Verify the url of the login page', async({ page }) => {
    await expect(page.url()).toBe(loginPage.baseUrl + urls.login);
    const locator = page.locator('.login_logo');
    await expect(locator).toHaveText(appName);
});

test('Login with valid credentials @standurdUser', async({ page }) => {
    await loginPage.login(users.standurdUser.username, users.standurdUser.password);
    await expect(page.url()).toBe(`${loginPage.baseUrl}${urls.inventory}`);

    await expect(page.locator('.title')).toHaveText(inventory.title);
});

test('Login with valid credentials @lockedOutUser', async({ page }) => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

    const locator = page.locator('.error-message-container');
    await expect(locator).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});