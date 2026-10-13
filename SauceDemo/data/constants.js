const appName = "Swag Labs";
const urls = {
    login: '/',
    inventory: '/inventory.html',
    cart: '/cart.html',
    checkout: '/checkout-step-one.html',
    checkoutOverview: '/checkout-step-two.html',
    checkoutComplete: '/checkout-complete.html'
}

const inventory = {
    title: 'Products',
    url: urls.inventory,
    footerText: '© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy',
    products: ['Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie'
    ],
    sortOptions: {
        lohi: 'lohi',
        hilo: 'hilo',
        az: 'az',
        za: 'za'
    }
}

const cart = {
    title: 'Your Cart',
    url: urls.cart,
}

const checkout = {
    title: 'Checkout: Your Information',
    url: urls.checkout,
}

const checkoutOverview = {
    title: 'Checkout: Overview',
    url: urls.checkoutOverview,
}

const checkoutComplete = {
    title: 'Checkout: Complete',
    url: urls.checkoutComplete,
    taxPercentage: 0.08, // 8% tax
}

module.exports = { appName, urls, inventory, cart, checkout, checkoutOverview, checkoutComplete  };