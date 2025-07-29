import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Shopping Cart Page Object Model for SwagLabs
 * Enhanced with comprehensive element coverage based on MCP server analysis
 */
export class ShoppingCartPage extends BasePage {
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
  
  // Page Title Elements
  private readonly pageTitle: Locator;
  private readonly titleSpan: Locator;
  
  // Cart Content Container Elements
  private readonly cartContentsContainer: Locator;
  private readonly cartList: Locator;
  private readonly cartQuantityLabel: Locator;
  private readonly cartDescLabel: Locator;
  
  // Cart Item Elements
  private readonly cartItems: Locator;
  private readonly inventoryItems: Locator;
  
  // Action Buttons
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;
  
  // Footer Elements
  private readonly footer: Locator;
  private readonly socialTwitter: Locator;
  private readonly socialFacebook: Locator;
  private readonly socialLinkedIn: Locator;
  private readonly footerCopy: Locator;

  constructor(page: Page) {
    super(page, '/cart.html');
    
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
    
    // Page Title Elements
    this.pageTitle = page.locator('.title');
    this.titleSpan = page.locator('[data-test="title"]');
    
    // Cart Content Container Elements
    this.cartContentsContainer = page.locator('[data-test="cart-contents-container"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartQuantityLabel = page.locator('[data-test="cart-quantity-label"]');
    this.cartDescLabel = page.locator('[data-test="cart-desc-label"]');
    
    // Cart Item Elements
    this.cartItems = page.locator('.cart_item');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    
    // Action Buttons
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    
    // Footer Elements
    this.footer = page.locator('[data-test="footer"]');
    this.socialTwitter = page.locator('[data-test="social-twitter"]');
    this.socialFacebook = page.locator('[data-test="social-facebook"]');
    this.socialLinkedIn = page.locator('[data-test="social-linkedin"]');
    this.footerCopy = page.locator('[data-test="footer-copy"]');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      cartList: this.cartList,
      continueShoppingButton: this.continueShoppingButton,
      checkoutButton: this.checkoutButton,
      titleSpan: this.titleSpan,
      cartContentsContainer: this.cartContentsContainer
    };
  }

  /**
   * Verify that the user has landed on the Shopping Cart page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Your Cart');
    await expect(this.titleSpan).toBeVisible();
    await expect(this.titleSpan).toHaveText('Your Cart');
    await expect(this.cartContentsContainer).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/cart.html');
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
   * Shopping Cart Badge Methods
   */
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
   * Cart Content Methods
   */
  async getCartItemCountFromPage(): Promise<number> {
    return await this.cartItems.count();
  }

  async verifyCartLabelsVisible(): Promise<void> {
    await expect(this.cartQuantityLabel).toBeVisible();
    await expect(this.cartQuantityLabel).toHaveText('QTY');
    await expect(this.cartDescLabel).toBeVisible();
    await expect(this.cartDescLabel).toHaveText('Description');
  }

  /**
   * Individual Cart Item Methods
   */
  getCartItemByName(productName: string): Locator {
    return this.page.locator('[data-test="inventory-item"]', { hasText: productName });
  }

  getCartItemByIndex(index: number): Locator {
    return this.inventoryItems.nth(index);
  }

  async getItemQuantity(productName: string): Promise<string> {
    const cartItem = this.getCartItemByName(productName);
    const quantityElement = cartItem.locator('[data-test="item-quantity"]');
    return await quantityElement.textContent() || '';
  }

  async getItemName(productName: string): Promise<string> {
    const cartItem = this.getCartItemByName(productName);
    const nameElement = cartItem.locator('[data-test="inventory-item-name"]');
    return await nameElement.textContent() || '';
  }

  async getItemDescription(productName: string): Promise<string> {
    const cartItem = this.getCartItemByName(productName);
    const descElement = cartItem.locator('[data-test="inventory-item-desc"]');
    return await descElement.textContent() || '';
  }

  async getItemPrice(productName: string): Promise<string> {
    const cartItem = this.getCartItemByName(productName);
    const priceElement = cartItem.locator('[data-test="inventory-item-price"]');
    return await priceElement.textContent() || '';
  }

  async clickItemTitle(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    const titleLink = cartItem.locator('[data-test*="title-link"]');
    await titleLink.click();
  }

  async removeItemFromCart(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    const removeButton = cartItem.locator('[data-test*="remove"]');
    await removeButton.click();
  }

  /**
   * Navigation Methods
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Cart State Verification Methods
   */
  async verifyCartIsEmpty(): Promise<void> {
    const itemCount = await this.getCartItemCountFromPage();
    expect(itemCount).toBe(0);
    await this.verifyCartBadgeNotVisible();
  }

  async verifyCartHasItems(expectedCount: number): Promise<void> {
    const itemCount = await this.getCartItemCountFromPage();
    expect(itemCount).toBe(expectedCount);
    await this.verifyCartBadge(expectedCount.toString());
  }

  async verifySpecificItemInCart(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    await expect(cartItem).toBeVisible();
  }

  async verifySpecificItemNotInCart(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    await expect(cartItem).not.toBeVisible();
  }

  /**
   * Enhanced Cart Item Information Methods
   */
  async getAllCartItemNames(): Promise<string[]> {
    const nameElements = await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    return nameElements;
  }

  async getAllCartItemPrices(): Promise<string[]> {
    const priceElements = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return priceElements;
  }

  async getAllCartItemQuantities(): Promise<string[]> {
    const quantityElements = await this.page.locator('[data-test="item-quantity"]').allTextContents();
    return quantityElements;
  }

  async verifyItemDetails(productName: string, expectedPrice: string, expectedQuantity: string = '1'): Promise<void> {
    await this.verifySpecificItemInCart(productName);
    
    const actualPrice = await this.getItemPrice(productName);
    const actualQuantity = await this.getItemQuantity(productName);
    
    expect(actualPrice).toBe(expectedPrice);
    expect(actualQuantity).toBe(expectedQuantity);
  }

  /**
   * Header and Footer Verification Methods
   */
  async verifyAllHeaderElements(): Promise<void> {
    await expect(this.headerContainer).toBeVisible();
    await expect(this.primaryHeader).toBeVisible();
    await expect(this.secondaryHeader).toBeVisible();
    await expect(this.openMenuButton).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async verifyFooterElements(): Promise<void> {
    await expect(this.footer).toBeVisible();
    await expect(this.socialTwitter).toBeVisible();
    await expect(this.socialFacebook).toBeVisible();
    await expect(this.socialLinkedIn).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
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
    await this.verifyCartLabelsVisible();
    await this.verifyFooterElements();
    await this.verifyMenuClosed();
    
    // Verify action buttons
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  /**
   * Cart manipulation methods for testing
   */
  async clearAllCartItems(): Promise<void> {
    const itemNames = await this.getAllCartItemNames();
    for (const itemName of itemNames) {
      await this.removeItemFromCart(itemName);
    }
  }

  async verifyCartItemOrder(expectedOrder: string[]): Promise<void> {
    const actualOrder = await this.getAllCartItemNames();
    expect(actualOrder).toEqual(expectedOrder);
  }

  /**
   * Price calculation methods
   */
  async calculateTotalPrice(): Promise<number> {
    const prices = await this.getAllCartItemPrices();
    let total = 0;
    
    for (const price of prices) {
      // Remove $ and convert to number
      const numericPrice = parseFloat(price.replace('$', ''));
      total += numericPrice;
    }
    
    return total;
  }

  // ============ Public Getters for Testing ============
  
  get continueShoppingBtn(): Locator {
    return this.continueShoppingButton;
  }

  get checkoutBtn(): Locator {
    return this.checkoutButton;
  }

  get cartBadge(): Locator {
    return this.shoppingCartBadge;
  }

  get footerCopyright(): Locator {
    return this.footerCopy;
  }

  /**
   * Get page instance for advanced operations
   */
  getPage(): Page {
    return this.page;
  }

  // ============ Legacy Methods for Backward Compatibility ============

  /**
   * Get cart item price by name
   * @deprecated Use getItemPrice() instead
   */
  async getCartItemPrice(productName: string): Promise<string> {
    return await this.getItemPrice(productName);
  }

  /**
   * Get all cart item names
   * @deprecated Use getAllCartItemNames() instead
   */
  async getCartItemNames(): Promise<string[]> {
    return await this.getAllCartItemNames();
  }

  /**
   * Verify specific item is in cart
   * @deprecated Use verifySpecificItemInCart() instead
   */
  async verifyItemInCart(productName: string): Promise<void> {
    await this.verifySpecificItemInCart(productName);
  }
}
