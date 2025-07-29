import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { USERS, PRODUCTS, CHECKOUT_INFO } from '../utils/testData';

/**
 * Functional Tests for Checkout Complete Page
 * Tests the checkout completion/finish page functionality
 * @functional
 */

// Helper function to complete checkout flow to finish page
async function completeCheckoutFlow(
  loginPage: LoginPage,
  productsPage: ProductsPage,
  cartPage: ShoppingCartPage,
  checkoutPage: CheckoutPage,
  overviewPage: CheckoutOverviewPage
) {
  // Login and navigate to checkout complete
  await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
  await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
  await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT);
  await productsPage.clickShoppingCart();
  await cartPage.clickCheckout();
  await checkoutPage.fillCheckoutInformation(CHECKOUT_INFO.VALID.firstName, CHECKOUT_INFO.VALID.lastName, CHECKOUT_INFO.VALID.postalCode);
  await checkoutPage.clickContinue();
  await overviewPage.clickFinish();
}

test.describe('@functional Checkout Complete Page - Page Structure', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should load checkout complete page correctly', async () => {
    await completePage.verifyPageLoaded();
  });

  test('should display correct page structure', async () => {
    await completePage.verifyPageStructure();
  });

  test('should display all required elements', async () => {
    const identifiers = completePage.getPageIdentifiers();
    
    for (const [key, locator] of Object.entries(identifiers)) {
      await expect(locator).toBeVisible({ timeout: 10000 });
    }
  });

  test('should have correct page title', async () => {
    const title = await completePage.getPageTitle();
    expect(title).toBe('Checkout: Complete!');
  });

  test('should display completion container', async () => {
    const pageReady = await completePage.isPageReady();
    expect(pageReady).toBe(true);
  });
});

test.describe('@functional Checkout Complete Page - Success Messages', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should display thank you header', async () => {
    const header = await completePage.getCompletionHeader();
    expect(header).toBe('Thank you for your order!');
  });

  test('should display dispatch confirmation message', async () => {
    const message = await completePage.getCompletionText();
    expect(message).toContain('Your order has been dispatched');
    expect(message).toContain('pony can get there');
  });

  test('should verify order completion messages', async () => {
    await completePage.verifyOrderCompletion();
  });

  test('should verify all success messages', async () => {
    await completePage.verifySuccessMessages();
  });

  test('should display all text content correctly', async () => {
    await completePage.verifyAllTextContent();
  });

  test('should get all visible text content', async () => {
    const allText = await completePage.getAllVisibleText();
    
    expect(allText.pageTitle).toBe('Checkout: Complete!');
    expect(allText.completionHeader).toBe('Thank you for your order!');
    expect(allText.completionText).toContain('Your order has been dispatched');
    expect(allText.backHomeButtonText).toBe('Back Home');
  });
});

test.describe('@functional Checkout Complete Page - Visual Elements', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should display Pony Express completion image', async () => {
    await completePage.verifyCompletionImage();
  });

  test('should verify image is loaded correctly', async () => {
    const imageLoaded = await completePage.isImageLoaded();
    expect(imageLoaded).toBe(true);
  });

  test('should verify all visual elements', async () => {
    await completePage.verifyVisualElements();
  });
});

test.describe('@functional Checkout Complete Page - Navigation', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should verify back home button properties', async () => {
    await completePage.verifyBackHomeButton();
  });

  test('should navigate back to products page via back home button', async () => {
    await completePage.clickBackHomeAndVerify();
  });

  test('should navigate back to products and verify URL', async ({ page }) => {
    await completePage.clickBackHome();
    await page.waitForURL('**/inventory.html');
    expect(page.url()).toContain('/inventory.html');
  });

  test('should reset cart after back home navigation', async ({ page }) => {
    await completePage.clickBackHome();
    await page.waitForURL('**/inventory.html');
    
    // Verify cart badge is not visible after reset
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  });
});

test.describe('@functional Checkout Complete Page - Menu Functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should verify menu button is accessible', async () => {
    await completePage.verifyMenuButton();
  });

  test('should open menu and verify all options', async () => {
    await completePage.openMenuAndVerify();
  });

  test('should navigate to All Items via menu', async ({ page }) => {
    await completePage.clickMenuButton();
    await page.waitForSelector('#inventory_sidebar_link', { state: 'visible' });
    
    const allItemsLink = page.locator('#inventory_sidebar_link');
    await allItemsLink.click();
    await page.waitForURL('**/inventory.html');
    expect(page.url()).toContain('/inventory.html');
  });

  test('should access About page via menu', async ({ page }) => {
    await completePage.clickMenuButton();
    await page.waitForSelector('#about_sidebar_link', { state: 'visible' });
    
    const aboutLink = page.locator('#about_sidebar_link');
    await aboutLink.click();
    // Note: About link opens external page, so we just verify click works
  });

  test('should reset app state via menu', async ({ page }) => {
    await completePage.clickMenuButton();
    await page.waitForSelector('#reset_sidebar_link', { state: 'visible' });
    
    const resetLink = page.locator('#reset_sidebar_link');
    await resetLink.click();
    
    // Verify reset happened by checking cart state
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  });
});

test.describe('@functional Checkout Complete Page - Cart State', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should verify cart is reset after completion', async () => {
    await completePage.verifyCartReset();
  });

  test('should not display cart badge after completion', async () => {
    const cartBadgeVisible = await completePage.isCartBadgeVisible();
    expect(cartBadgeVisible).toBe(false);
  });

  test('should navigate to empty cart page', async ({ page }) => {
    await completePage.clickShoppingCart();
    await page.waitForURL('**/cart.html');
    
    // Verify cart is empty
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);
  });
});

test.describe('@functional Checkout Complete Page - Footer', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should verify footer is displayed', async () => {
    await completePage.verifyFooter();
  });

  test('should verify social media links', async () => {
    await completePage.verifySocialLinks();
  });

  test('should display footer text', async () => {
    const footerText = await completePage.getFooterText();
    expect(footerText).toContain('© 2025 Sauce Labs');
  });
});

test.describe('@functional Checkout Complete Page - Interactive Elements', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should verify all interactive elements', async () => {
    await completePage.verifyAllInteractiveElements();
  });

  test('should wait for page to be ready', async () => {
    await completePage.waitForPageReady();
    const isReady = await completePage.isPageReady();
    expect(isReady).toBe(true);
  });
});

test.describe('@functional Checkout Complete Page - Comprehensive Verification', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await completeCheckoutFlow(loginPage, productsPage, cartPage, checkoutPage, overviewPage);
  });

  test('should verify successful checkout completion', async () => {
    await completePage.verifySuccessfulCheckout();
  });

  test('should perform complete page verification', async () => {
    await completePage.performCompletePageVerification();
  });

  test('should verify checkout completion with order details', async () => {
    await completePage.verifyPageLoaded();
    await completePage.verifyOrderCompletion();
    await completePage.verifyVisualElements();
    await completePage.verifyCartReset();
  });
});
