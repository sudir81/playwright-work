# SauceDemo – Playwright Test Automation

End-to-end UI tests for the [Swag Labs (SauceDemo)](https://www.saucedemo.com) demo store, written with [Playwright Test](https://playwright.dev) in JavaScript using the **Page Object Model (POM)**.

## Tech Stack

- [@playwright/test](https://playwright.dev/docs/intro) – test runner and browser automation
- [dotenv](https://github.com/motdotla/dotenv) – loads environment variables from `.env`
- Node.js

## Project Structure

```
SauceDemo/
├── data/
│   ├── constants.js          # App name, page URLs, page titles, product list, sort options, tax rate
│   └── users.js              # SauceDemo test users and checkout form details
├── pages/                    # Page Objects (locators + actions)
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── CheckoutOverviewPage.js
│   └── CheckoutComplete.js   # (in progress)
├── tests/                    # Test specs, one per page
│   ├── login.spec.js
│   ├── inventory.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── checkoutoverview.spec.js
│   └── checkoutcomplete.spec.js   # (in progress)
├── .env                      # Environment variables (BASE_URL)
├── playwright.config.js      # Playwright configuration
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

## Setup

1. Install dependencies:

   ```bash
   cd SauceDemo
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

3. Create a `.env` file in the `SauceDemo` folder (if not present):

   ```env
   BASE_URL=https://www.saucedemo.com
   ```

   > Do not add a trailing slash — tests build URLs as `BASE_URL + "/inventory.html"`, etc.

## Running Tests

| Command | Description |
| --- | --- |
| `npx playwright test` | Run all tests on all configured browsers |
| `npx playwright test --project=chromium` | Run on Chromium only |
| `npx playwright test tests/login.spec.js` | Run a single spec file |
| `npx playwright test -g "Verify cart items list"` | Run tests whose title matches |
| `npx playwright test --headed` | Run with the browser visible |
| `npx playwright test --ui` | Open Playwright UI mode |
| `npx playwright test --debug` | Run with the Playwright Inspector |
| `npx playwright show-report` | Open the last HTML report |

## Configuration

Key settings in [playwright.config.js](playwright.config.js):

- **Test directory:** `./tests`
- **Base URL:** `process.env.BASE_URL` (loaded from `.env`)
- **Browsers:** Chromium, Firefox, WebKit
- **Parallelism:** fully parallel locally; 1 worker on CI
- **Retries:** 0 locally, 2 on CI
- **Reporter:** HTML (`playwright-report/`)
- **Artifacts on failure:** screenshots, videos (`test-results/`), and traces on first retry

## Test Coverage

| Spec | Page | What is verified |
| --- | --- | --- |
| `login.spec.js` | Login | Page URL and logo, successful login as `standard_user`, error message for `locked_out_user` |
| `inventory.spec.js` | Inventory | URL and title, top bar (logo, burger menu, cart), product count and names, add to cart, sort by price (low → high), footer text |
| `cart.spec.js` | Cart | URL and title, top bar, cart badge count, cart item names and quantities, removing an item |
| `checkout.spec.js` | Checkout: Your Information | URL and title, Continue button, filling and submitting the form |
| `checkoutoverview.spec.js` | Checkout: Overview | URL and title, Finish button, cart items, payment and shipping info, item total, tax (8%), and order total |
| `checkoutcomplete.spec.js` | Checkout: Complete | *In progress* |

Each spec uses `test.beforeEach` to log in as `standard_user` and navigate to the page under test (for example, adding two products and going through checkout before the overview tests).

## Test Data

- **Users** ([data/users.js](data/users.js)): the standard SauceDemo accounts — `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user` (password: `secret_sauce`).
- **Constants** ([data/constants.js](data/constants.js)): page URLs and titles, the expected product list, sort option values (`az`, `za`, `lohi`, `hilo`), and the tax rate.

## Page Object Model

Each page class wraps its locators and user actions so tests stay readable:

```js
const loginPage = new LoginPage(page);
await loginPage.open();
await loginPage.login(users.standurdUser.username, users.standurdUser.password);

const inventoryPage = new InventoryPage(page);
await inventoryPage.addProductToCart(inventory.products[0]);
```

## Reports and Results

- **HTML report:** `playwright-report/` — open with `npx playwright show-report`
- **Failure artifacts:** `test-results/` — screenshots, videos, and error context per failed test

Both folders are git-ignored.
