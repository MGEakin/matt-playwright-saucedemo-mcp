import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Complete Page Object Model for SwagLabs
 * Enhanced with comprehensive element coverage based on MCP server analysis
 */
export class CheckoutCompletePage extends BasePage {
  // Page Structure Locators
  private readonly pageTitle: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly completeImage: Locator;
  private readonly backHomeButton: Locator;

  // Container Locators
  private readonly checkoutCompleteContainer: Locator;
  private readonly primaryHeader: Locator;
  private readonly subHeader: Locator;

  // Navigation Locators
  private readonly menuButton: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly cartBadge: Locator;

  // Footer Locators
  private readonly footer: Locator;
  private readonly footerText: Locator;
  private readonly socialLinks: Locator;

  constructor(page: Page) {
    super(page, '/checkout-complete.html');
    
    // Page Structure Elements
    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.completeImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');

    // Container Elements
    this.checkoutCompleteContainer = page.locator('#checkout_complete_container');
    this.primaryHeader = page.locator('h2.complete-header');
    this.subHeader = page.locator('.complete-text');

    // Navigation Elements
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');

    // Footer Elements
    this.footer = page.locator('.footer');
    this.footerText = page.locator('.footer_copy');
    this.socialLinks = page.locator('.social');
  }

  /**
   * Page Verification Methods
   */

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      completeHeader: this.completeHeader,
      completeText: this.completeText,
      backHomeButton: this.backHomeButton,
      completeImage: this.completeImage
    };
  }

  /**
   * Verify that the user has landed on the Checkout Complete page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeText).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
    await expect(this.completeImage).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/checkout-complete.html');
  }

  /**
   * Verify page structure is correct
   */
  async verifyPageStructure(): Promise<void> {
    await expect(this.checkoutCompleteContainer).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.completeImage).toBeVisible();
    await expect(this.primaryHeader).toBeVisible();
    await expect(this.subHeader).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  /**
   * Content Verification Methods
   */

  /**
   * Get completion header text
   */
  async getCompletionHeader(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  /**
   * Get completion message text
   */
  async getCompletionText(): Promise<string> {
    return await this.completeText.textContent() || '';
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  /**
   * Verify order completion message
   */
  async verifyOrderCompletion(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toContainText('Your order has been dispatched');
    await expect(this.completeImage).toBeVisible();
  }

  /**
   * Verify success messages are displayed correctly
   */
  async verifySuccessMessages(): Promise<void> {
    const headerText = await this.getCompletionHeader();
    const messageText = await this.getCompletionText();
    
    expect(headerText).toBe('Thank you for your order!');
    expect(messageText).toContain('Your order has been dispatched');
    expect(messageText).toContain('pony can get there');
  }

  /**
   * Verify all text content on the page
   */
  async verifyAllTextContent(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toContainText('Your order has been dispatched');
    await expect(this.backHomeButton).toHaveText('Back Home');
  }

  /**
   * Image and Visual Elements Methods
   */

  /**
   * Verify completion image is displayed
   */
  async verifyCompletionImage(): Promise<void> {
    await expect(this.completeImage).toBeVisible();
    await expect(this.completeImage).toHaveAttribute('alt', 'Pony Express');
  }

  /**
   * Check if image is loaded correctly
   */
  async isImageLoaded(): Promise<boolean> {
    const isVisible = await this.completeImage.isVisible();
    const hasAltText = await this.completeImage.getAttribute('alt');
    return isVisible && hasAltText === 'Pony Express';
  }

  /**
   * Verify visual completion indicators
   */
  async verifyVisualElements(): Promise<void> {
    await this.verifyCompletionImage();
    await expect(this.completeImage).toHaveClass(/pony_express/);
  }

  /**
   * Navigation and Interaction Methods
   */

  /**
   * Click back home button
   */
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  /**
   * Click back home and verify navigation
   */
  async clickBackHomeAndVerify(): Promise<void> {
    await this.clickBackHome();
    await this.page.waitForURL('**/inventory.html');
    expect(this.getCurrentUrl()).toContain('/inventory.html');
  }

  /**
   * Navigate back to products page
   */
  async navigateBackToProducts(): Promise<void> {
    await this.clickBackHome();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify back home button properties
   */
  async verifyBackHomeButton(): Promise<void> {
    await expect(this.backHomeButton).toBeVisible();
    await expect(this.backHomeButton).toBeEnabled();
    await expect(this.backHomeButton).toHaveText('Back Home');
    await expect(this.backHomeButton).toHaveAttribute('data-test', 'back-to-products');
  }

  /**
   * Cart and Shopping Methods
   */

  /**
   * Check if cart badge is visible
   */
  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  /**
   * Verify cart is reset after completion
   */
  async verifyCartReset(): Promise<void> {
    const cartBadgeVisible = await this.isCartBadgeVisible();
    expect(cartBadgeVisible).toBe(false);
  }

  /**
   * Click shopping cart link
   */
  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Menu and Navigation Methods
   */

  /**
   * Click hamburger menu button
   */
  async clickMenuButton(): Promise<void> {
    await this.menuButton.click();
  }

  /**
   * Verify menu button is accessible
   */
  async verifyMenuButton(): Promise<void> {
    await expect(this.menuButton).toBeVisible();
    await expect(this.menuButton).toBeEnabled();
  }

  /**
   * Open menu and verify options
   */
  async openMenuAndVerify(): Promise<void> {
    await this.clickMenuButton();
    await this.page.waitForSelector('#inventory_sidebar_link', { state: 'visible' });
    
    const allItemsLink = this.page.locator('#inventory_sidebar_link');
    const aboutLink = this.page.locator('#about_sidebar_link');
    const logoutLink = this.page.locator('#logout_sidebar_link');
    const resetLink = this.page.locator('#reset_sidebar_link');

    await expect(allItemsLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(logoutLink).toBeVisible();
    await expect(resetLink).toBeVisible();
  }

  /**
   * Footer Methods
   */

  /**
   * Verify footer is displayed
   */
  async verifyFooter(): Promise<void> {
    await expect(this.footer).toBeVisible();
    await expect(this.footerText).toBeVisible();
  }

  /**
   * Check social media links in footer
   */
  async verifySocialLinks(): Promise<void> {
    await expect(this.socialLinks).toBeVisible();
    const twitterLink = this.socialLinks.locator('.social_twitter');
    const facebookLink = this.socialLinks.locator('.social_facebook');
    const linkedinLink = this.socialLinks.locator('.social_linkedin');

    await expect(twitterLink).toBeVisible();
    await expect(facebookLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
  }

  /**
   * Get footer text content
   */
  async getFooterText(): Promise<string> {
    return await this.footerText.textContent() || '';
  }

  /**
   * Comprehensive Verification Methods
   */

  /**
   * Verify successful checkout flow completion
   */
  async verifySuccessfulCheckout(): Promise<void> {
    await this.verifyPageLoaded();
    await this.verifyOrderCompletion();
    await this.verifyCartReset();
  }

  /**
   * Perform complete page verification
   */
  async performCompletePageVerification(): Promise<void> {
    await this.verifyPageStructure();
    await this.verifyAllTextContent();
    await this.verifyVisualElements();
    await this.verifyBackHomeButton();
    await this.verifyMenuButton();
    await this.verifyFooter();
    await this.verifyCartReset();
  }

  /**
   * Verify all interactive elements
   */
  async verifyAllInteractiveElements(): Promise<void> {
    await this.verifyBackHomeButton();
    await this.verifyMenuButton();
    await expect(this.shoppingCartLink).toBeVisible();
  }

  /**
   * Test all navigation options
   */
  async testAllNavigationOptions(): Promise<void> {
    // Test menu functionality
    await this.clickMenuButton();
    await this.page.waitForSelector('#inventory_sidebar_link', { state: 'visible' });
    
    // Close menu
    const closeButton = this.page.locator('#react-burger-cross-btn');
    await closeButton.click();
    
    // Test cart navigation
    await this.clickShoppingCart();
    await this.page.goBack();
    
    // Test back home button
    await this.clickBackHome();
  }

  /**
   * Utility Methods
   */

  /**
   * Check if page is ready for interaction
   */
  async isPageReady(): Promise<boolean> {
    try {
      await expect(this.pageTitle).toBeVisible({ timeout: 5000 });
      await expect(this.completeHeader).toBeVisible({ timeout: 5000 });
      await expect(this.backHomeButton).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.pageTitle).toBeVisible();
    await expect(this.completeHeader).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  /**
   * Get all visible text on the page
   */
  async getAllVisibleText(): Promise<Record<string, string>> {
    return {
      pageTitle: await this.getPageTitle(),
      completionHeader: await this.getCompletionHeader(),
      completionText: await this.getCompletionText(),
      backHomeButtonText: await this.backHomeButton.textContent() || '',
      footerText: await this.getFooterText()
    };
  }
}
