import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Product Details Page Object Model for SwagLabs
 * Enhanced with comprehensive element coverage based on MCP server analysis
 */
export class ProductDetailsPage extends BasePage {
  // Header Elements
  private readonly headerContainer: Locator;
  private readonly primaryHeader: Locator;
  private readonly secondaryHeader: Locator;
  private readonly appLogo: Locator;
  
  // Navigation Menu Elements
  private readonly openMenuButton: Locator;
  private readonly closeMenuButton: Locator;
  private readonly inventorySidebarLink: Locator;
  private readonly aboutSidebarLink: Locator;
  private readonly logoutSidebarLink: Locator;
  private readonly resetSidebarLink: Locator;
  
  // Shopping Cart Elements
  private readonly shoppingCartLink: Locator;
  private readonly shoppingCartBadge: Locator;
  
  // Navigation Elements
  private readonly backToProductsButton: Locator;
  
  // Product Details Container Elements
  private readonly inventoryContainer: Locator;
  private readonly inventoryItem: Locator;
  private readonly inventoryDetailsContainer: Locator;
  
  // Product Information Elements
  private readonly productImage: Locator;
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productPrice: Locator;
  
  // Product Action Elements
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;
  
  // Footer Elements
  private readonly footer: Locator;
  private readonly socialTwitter: Locator;
  private readonly socialFacebook: Locator;
  private readonly socialLinkedIn: Locator;
  private readonly footerCopy: Locator;
  
  // Legacy locators for backward compatibility
  private readonly inventoryDetailsName: Locator;
  private readonly inventoryDetailsDesc: Locator;
  private readonly inventoryDetailsPrice: Locator;
  private readonly inventoryDetailsImg: Locator;

  constructor(page: Page) {
    super(page, '/inventory-item.html');
    
    // Header Elements
    this.headerContainer = page.locator('[data-test="header-container"]');
    this.primaryHeader = page.locator('[data-test="primary-header"]');
    this.secondaryHeader = page.locator('[data-test="secondary-header"]');
    this.appLogo = page.locator('.app_logo');
    
    // Navigation Menu Elements
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.inventorySidebarLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutSidebarLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutSidebarLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetSidebarLink = page.locator('[data-test="reset-sidebar-link"]');
    
    // Shopping Cart Elements
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    
    // Navigation Elements
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    
    // Product Details Container Elements
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.inventoryDetailsContainer = page.locator('.inventory_details_container');
    
    // Product Information Elements
    this.productImage = page.locator('[data-test*="-img"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    
    // Product Action Elements
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
    
    // Footer Elements
    this.footer = page.locator('[data-test="footer"]');
    this.socialTwitter = page.locator('[data-test="social-twitter"]');
    this.socialFacebook = page.locator('[data-test="social-facebook"]');
    this.socialLinkedIn = page.locator('[data-test="social-linkedin"]');
    this.footerCopy = page.locator('[data-test="footer-copy"]');
    
    // Legacy locators for backward compatibility
    this.inventoryDetailsName = this.productName;
    this.inventoryDetailsDesc = this.productDescription;
    this.inventoryDetailsPrice = this.productPrice;
    this.inventoryDetailsImg = this.productImage;
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      backToProductsButton: this.backToProductsButton,
      inventoryDetailsContainer: this.inventoryDetailsContainer,
      inventoryDetailsName: this.inventoryDetailsName,
      inventoryDetailsPrice: this.inventoryDetailsPrice
    };
  }

  /**
   * Verify that the user has landed on the Product Details page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.backToProductsButton).toBeVisible();
    await expect(this.inventoryDetailsContainer).toBeVisible();
    await expect(this.inventoryDetailsName).toBeVisible();
    await expect(this.inventoryDetailsPrice).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/inventory-item.html');
  }

  /**
   * Get product name
   */
  async getProductName(): Promise<string> {
    return await this.inventoryDetailsName.textContent() || '';
  }

  /**
   * Get product description
   */
  async getProductDescription(): Promise<string> {
    return await this.inventoryDetailsDesc.textContent() || '';
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string> {
    return await this.inventoryDetailsPrice.textContent() || '';
  }

  /**
   * Add product to cart
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Remove product from cart
   */
  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  /**
   * Click back to products
   */
  async clickBackToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }

  /**
   * Verify product information is displayed
   */
  async verifyProductInformation(): Promise<void> {
    await expect(this.inventoryDetailsName).toBeVisible();
    await expect(this.inventoryDetailsDesc).toBeVisible();
    await expect(this.inventoryDetailsPrice).toBeVisible();
    await expect(this.inventoryDetailsImg).toBeVisible();
  }

  /**
   * Check if product is in cart (remove button visible)
   */
  async isProductInCart(): Promise<boolean> {
    return await this.removeButton.isVisible();
  }

  // ============ Enhanced Methods Based on MCP Server Analysis ============

  /**
   * Navigation Menu Methods
   */
  async openMenu(): Promise<void> {
    await this.openMenuButton.click();
  }

  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
  }

  async navigateToAllItems(): Promise<void> {
    await this.openMenu();
    await this.inventorySidebarLink.click();
  }

  async navigateToAbout(): Promise<void> {
    await this.openMenu();
    await this.aboutSidebarLink.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutSidebarLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetSidebarLink.click();
  }

  /**
   * Shopping Cart Methods
   */
  async navigateToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async getCartItemCount(): Promise<string | null> {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent();
    }
    return null;
  }

  async verifyCartBadge(expectedCount: string): Promise<void> {
    await expect(this.shoppingCartBadge).toBeVisible();
    await expect(this.shoppingCartBadge).toHaveText(expectedCount);
  }

  async verifyCartBadgeNotVisible(): Promise<void> {
    await expect(this.shoppingCartBadge).not.toBeVisible();
  }

  /**
   * Product Details Enhanced Methods
   */
  async getProductImageSrc(): Promise<string | null> {
    return await this.productImage.getAttribute('src');
  }

  async getProductImageAlt(): Promise<string | null> {
    return await this.productImage.getAttribute('alt');
  }

  async verifyProductImageLoaded(): Promise<void> {
    await expect(this.productImage).toBeVisible();
    const src = await this.getProductImageSrc();
    expect(src).toBeTruthy();
  }

  async verifyPriceFormat(): Promise<void> {
    const price = await this.getProductPrice();
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  }

  async getProductId(): Promise<string | null> {
    const url = this.getCurrentUrl();
    const urlParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get('id');
  }

  /**
   * Enhanced Verification Methods
   */
  async verifyAllHeaderElements(): Promise<void> {
    await expect(this.headerContainer).toBeVisible();
    await expect(this.primaryHeader).toBeVisible();
    await expect(this.secondaryHeader).toBeVisible();
    await expect(this.openMenuButton).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async verifyProductDetailsSection(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.inventoryItem).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
  }

  async verifyFooterElements(): Promise<void> {
    await expect(this.footer).toBeVisible();
    await expect(this.socialTwitter).toBeVisible();
    await expect(this.socialFacebook).toBeVisible();
    await expect(this.socialLinkedIn).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
  }

  async verifyBackButton(): Promise<void> {
    await expect(this.backToProductsButton).toBeVisible();
    await expect(this.backToProductsButton).toHaveText(/Back to products/);
  }

  /**
   * State-dependent verification methods
   */
  async verifyAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toHaveText('Add to cart');
  }

  async verifyRemoveButtonVisible(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
    await expect(this.removeButton).toHaveText('Remove');
  }

  async verifyButtonState(inCart: boolean): Promise<void> {
    if (inCart) {
      await this.verifyRemoveButtonVisible();
      await expect(this.addToCartButton).not.toBeVisible();
    } else {
      await this.verifyAddToCartButtonVisible();
      await expect(this.removeButton).not.toBeVisible();
    }
  }

  /**
   * Menu state verification methods
   */
  async verifyMenuClosed(): Promise<void> {
    await expect(this.inventorySidebarLink).not.toBeVisible();
    await expect(this.aboutSidebarLink).not.toBeVisible();
    await expect(this.logoutSidebarLink).not.toBeVisible();
    await expect(this.resetSidebarLink).not.toBeVisible();
    await expect(this.closeMenuButton).not.toBeVisible();
  }

  async verifyMenuOpen(): Promise<void> {
    await expect(this.inventorySidebarLink).toBeVisible();
    await expect(this.aboutSidebarLink).toBeVisible();
    await expect(this.logoutSidebarLink).toBeVisible();
    await expect(this.resetSidebarLink).toBeVisible();
    await expect(this.closeMenuButton).toBeVisible();
  }

  /**
   * Social media link verification
   */
  async verifySocialMediaLinks(): Promise<void> {
    await expect(this.socialTwitter).toHaveAttribute('href', 'https://twitter.com/saucelabs');
    await expect(this.socialFacebook).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
    await expect(this.socialLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
  }

  /**
   * Complete page verification method
   */
  async verifyCompletePageStructure(): Promise<void> {
    await this.verifyAllHeaderElements();
    await this.verifyBackButton();
    await this.verifyProductDetailsSection();
    await this.verifyFooterElements();
    await this.verifyMenuClosed();
  }

  // ============ Public Getters for Testing ============
  
  get backButton(): Locator {
    return this.backToProductsButton;
  }

  get addButton(): Locator {
    return this.addToCartButton;
  }

  get removeBtn(): Locator {
    return this.removeButton;
  }

  get footerCopyright(): Locator {
    return this.footerCopy;
  }

  /**
   * Navigate to page with optional query parameters
   */
  async navigate(queryParams?: string): Promise<void> {
    const url = queryParams ? `${this.url}${queryParams}` : this.url;
    await this.page.goto(`https://www.saucedemo.com${url}`);
  }

  /**
   * Get page instance for advanced operations
   */
  getPage(): Page {
    return this.page;
  }
}
