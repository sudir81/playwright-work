# Playwright Work

A collection of end-to-end UI test automation projects built with [Playwright Test](https://playwright.dev) in JavaScript, created while learning and practicing test automation.

## Projects

| Project | Application under test | Description |
| --- | --- | --- |
| [SauceDemo](SauceDemo/) | [Swag Labs (saucedemo.com)](https://www.saucedemo.com) | UI tests covering login, inventory, cart, and the full checkout flow, written using the Page Object Model |

Each project is a standalone Node.js package with its own `package.json`, `playwright.config.js`, and README. See the project README for setup and details, for example [SauceDemo/ReadME.md](SauceDemo/ReadME.md).

## Repository Structure

```
playwright-work/
├── ReadMe.md                 # This file
└── SauceDemo/                # Swag Labs test project
    ├── data/                 # Test data (users, constants)
    ├── pages/                # Page Objects
    ├── tests/                # Test specs
    ├── playwright.config.js
    ├── package.json
    └── ReadME.md             # Project-specific documentation
```

## Tech Stack

- [Node.js](https://nodejs.org/) (LTS recommended)
- [@playwright/test](https://playwright.dev/docs/intro): test runner and browser automation
- [dotenv](https://github.com/motdotla/dotenv): environment configuration
- Browsers: Chromium, Firefox, and WebKit

## Quick Start

```bash
git clone <repository-url>
cd playwright-work/SauceDemo
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

> Each project needs a `.env` file with `BASE_URL` set. See the project README for details.

## Approach

- **Page Object Model:** locators and user actions live in page classes, so specs stay short and readable.
- **Centralized test data:** URLs, page titles, products, and user credentials are kept in `data/` instead of being hard-coded in tests.
- **One spec per page:** each page of the application has its own spec file, and `beforeEach` hooks set up the required state.
- **Cross-browser:** tests run on Chromium, Firefox, and WebKit, with screenshots, videos, and traces kept on failure.
