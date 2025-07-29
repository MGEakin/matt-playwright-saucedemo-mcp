import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { USERS, PRODUCTS, CHECKOUT_INFO } from '../utils/testData';

/**
 * End-to-End Tests for Complete Checkout Flow
 * Tests the entire e-commerce workflow from login to checkout completion
 * @e2e
 */

test.describe('@e2e Complete Checkout Flow', () => {
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
  });

  test('should complete full checkout flow with single product', async ({ page }) => {
    // Step 1: Login
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await productsPage.verifyPageLoaded();

    // Step 2: Add product to cart
    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
    
    // Verify cart badge
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // Step 3: Navigate to cart
    await productsPage.clickShoppingCart();
    await cartPage.verifyPageLoaded();

    // Step 4: Proceed to checkout
    await cartPage.clickCheckout();
    await checkoutPage.verifyPageLoaded();

    // Step 5: Fill checkout information
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_INFO.VALID.firstName, 
      CHECKOUT_INFO.VALID.lastName, 
      CHECKOUT_INFO.VALID.postalCode
    );
    await checkoutPage.clickContinue();

    // Step 6: Review order
    await overviewPage.verifyPageLoaded();
    await overviewPage.clickFinish();

    // Step 7: Verify completion
    await completePage.verifyPageLoaded();
    await completePage.verifySuccessfulCheckout();
    
    // Verify success messages
    const completionHeader = await completePage.getCompletionHeader();
    expect(completionHeader).toBe('Thank you for your order!');

    // Step 8: Navigate back
    await completePage.clickBackHome();
    await page.waitForURL('**/inventory.html');
    
    // Verify cart is reset
    await expect(cartBadge).not.toBeVisible();
  });

  test('should complete full checkout flow with multiple products', async ({ page }) => {
    // Login and add multiple products
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT);
    
    // Verify cart count
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    // Complete checkout flow
    await productsPage.clickShoppingCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_INFO.VALID.firstName, 
      CHECKOUT_INFO.VALID.lastName, 
      CHECKOUT_INFO.VALID.postalCode
    );
    await checkoutPage.clickContinue();
    await overviewPage.clickFinish();

    // Verify completion
    await completePage.verifySuccessfulCheckout();
    await completePage.clickBackHome();
    await page.waitForURL('**/inventory.html');
  });

  test('should verify all page transitions in checkout flow', async ({ page }) => {
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    expect(page.url()).toContain('/inventory.html');

    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
    await productsPage.clickShoppingCart();
    expect(page.url()).toContain('/cart.html');

    await cartPage.clickCheckout();
    expect(page.url()).toContain('/checkout-step-one.html');

    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_INFO.VALID.firstName, 
      CHECKOUT_INFO.VALID.lastName, 
      CHECKOUT_INFO.VALID.postalCode
    );
    await checkoutPage.clickContinue();
    expect(page.url()).toContain('/checkout-step-two.html');

    await overviewPage.clickFinish();
    expect(page.url()).toContain('/checkout-complete.html');

    await completePage.clickBackHome();
    expect(page.url()).toContain('/inventory.html');
  });

  test('should verify finish page comprehensive functionality', async ({ page }) => {
    // Complete checkout to reach finish page
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
    await productsPage.clickShoppingCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_INFO.VALID.firstName, 
      CHECKOUT_INFO.VALID.lastName, 
      CHECKOUT_INFO.VALID.postalCode
    );
    await checkoutPage.clickContinue();
    await overviewPage.clickFinish();
    
    // Comprehensive finish page verification
    await completePage.performCompletePageVerification();
    
    // Test navigation functionality
    await completePage.verifyMenuButton();
    await completePage.verifyBackHomeButton();
    
    // Verify cart reset
    await completePage.verifyCartReset();
  });
});
