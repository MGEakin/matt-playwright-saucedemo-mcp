import { Page } from '@playwright/test';
import { 
  LoginPage, 
  ProductsPage, 
  ProductDetailsPage, 
  ShoppingCartPage, 
  CheckoutPage, 
  CheckoutOverviewPage, 
  CheckoutCompletePage 
} from '../pages';
import { USERS } from './testData';

/**
 * Test helper class to provide common test utilities and page navigation flows
 */
export class TestHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Login with standard user credentials
   */
  async loginAsStandardUser(): Promise<void> {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
  }

  /**
   * Login with custom credentials
   */
  async loginWithCredentials(username: string, password: string): Promise<void> {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.login(username, password);
  }

  /**
   * Navigate through complete checkout flow
   */
  async completeCheckoutFlow(
    productName: string, 
    firstName: string = 'John', 
    lastName: string = 'Doe', 
    postalCode: string = '12345'
  ): Promise<void> {
    // Login
    await this.loginAsStandardUser();
    
    // Add product to cart
    const productsPage = new ProductsPage(this.page);
    await productsPage.addProductToCart(productName);
    await productsPage.clickShoppingCart();
    
    // Proceed to checkout
    const cartPage = new ShoppingCartPage(this.page);
    await cartPage.clickCheckout();
    
    // Fill checkout information
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.completeCheckoutInformation(firstName, lastName, postalCode);
    
    // Complete order
    const overviewPage = new CheckoutOverviewPage(this.page);
    await overviewPage.clickFinish();
  }

  /**
   * Add multiple products to cart
   */
  async addMultipleProductsToCart(productNames: string[]): Promise<void> {
    const productsPage = new ProductsPage(this.page);
    
    for (const productName of productNames) {
      await productsPage.addProductToCart(productName);
    }
  }

  /**
   * Get all page objects for the current page instance
   */
  getPageObjects() {
    return {
      loginPage: new LoginPage(this.page),
      productsPage: new ProductsPage(this.page),
      productDetailsPage: new ProductDetailsPage(this.page),
      shoppingCartPage: new ShoppingCartPage(this.page),
      checkoutPage: new CheckoutPage(this.page),
      checkoutOverviewPage: new CheckoutOverviewPage(this.page),
      checkoutCompletePage: new CheckoutCompletePage(this.page)
    };
  }

  /**
   * Wait for network idle state
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot with timestamp
   */
  async takeTimestampedScreenshot(name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `screenshots/${name}-${timestamp}.png`, 
      fullPage: true 
    });
  }
}
