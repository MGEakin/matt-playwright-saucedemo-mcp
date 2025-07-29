import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage, ProductDetailsPage, ShoppingCartPage, CheckoutPage, CheckoutOverviewPage, CheckoutCompletePage } from '../pages';
import { USERS, PRODUCTS, CHECKOUT_INFO } from '../utils/testData';
import { TestHelper } from '../utils/testHelper';

test.describe('SwagLabs Smoke Tests', () => {
  let testHelper: TestHelper;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelper(page);
  });

  test('@smoke Login Page - Verify user lands on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.verifyPageLoaded();
    
    // Additional verifications
    expect(await loginPage.getTitle()).toContain('Swag Labs');
    expect(loginPage.getCurrentUrl()).toContain('saucedemo.com');
  });

  test('@smoke Products Page - Verify user lands on products page', async ({ page }) => {
    // Login first
    await testHelper.loginAsStandardUser();
    
    const productsPage = new ProductsPage(page);
    await productsPage.verifyPageLoaded();
    
    // Additional verifications
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    const productNames = await productsPage.getAllProductNames();
    expect(productNames.length).toBeGreaterThan(0);
  });

  test('@smoke Product Details Page - Verify user lands on product details page', async ({ page }) => {
    // Login and navigate to products
    await testHelper.loginAsStandardUser();
    
    const productsPage = new ProductsPage(page);
    await productsPage.clickProductTitle(PRODUCTS.SAUCE_LABS_BACKPACK);
    
    const productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.verifyPageLoaded();
    
    // Additional verifications
    await productDetailsPage.verifyProductInformation();
    const productName = await productDetailsPage.getProductName();
    expect(productName).toBe(PRODUCTS.SAUCE_LABS_BACKPACK);
  });

  test('@smoke Shopping Cart Page - Verify user lands on shopping cart page', async ({ page }) => {
    // Login and add product to cart
    await testHelper.loginAsStandardUser();
    
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
    await productsPage.clickShoppingCart();
    
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.verifyPageLoaded();
    
    // Additional verifications
    const itemCount = await shoppingCartPage.getCartItemCount();
    expect(itemCount).toBe(1);
    
    await shoppingCartPage.verifyItemInCart(PRODUCTS.SAUCE_LABS_BACKPACK);
  });

  test('@smoke Checkout Page - Verify user lands on checkout page', async ({ page }) => {
    // Login, add product and go to cart
    await testHelper.loginAsStandardUser();
    
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
    await productsPage.clickShoppingCart();
    
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyPageLoaded();
    
    // Additional verifications
    expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-one.html');
  });

  test('@smoke Checkout Overview Page - Verify user lands on checkout overview page', async ({ page }) => {
    // Login, add product, go to cart and fill checkout info
    await testHelper.loginAsStandardUser();
    
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(PRODUCTS.SAUCE_LABS_BACKPACK);
    await productsPage.clickShoppingCart();
    
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.completeCheckoutInformation(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.verifyPageLoaded();
    
    // Additional verifications
    await checkoutOverviewPage.verifyOrderSummary();
    await checkoutOverviewPage.verifyItemInOverview(PRODUCTS.SAUCE_LABS_BACKPACK);
    
    const itemCount = await checkoutOverviewPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('@smoke Checkout Complete Page - Verify user lands on checkout complete page', async ({ page }) => {
    // Complete full checkout flow
    await testHelper.completeCheckoutFlow(PRODUCTS.SAUCE_LABS_BACKPACK);
    
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await checkoutCompletePage.verifyPageLoaded();
    
    // Additional verifications
    await checkoutCompletePage.verifySuccessfulCheckout();
    
    const completionHeader = await checkoutCompletePage.getCompletionHeader();
    expect(completionHeader).toBe('Thank you for your order!');
  });
});
