import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Overview Page Object Model for SwagLabs
 * Enhanced with comprehensive element coverage based on MCP server analysis
 */
export class CheckoutOverviewPage extends BasePage {
  // Header Elements
  readonly menuButton: Locator;
  readonly menuIcon: Locator;
  readonly appLogo: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly pageTitle: Locator;

  // Navigation Menu Elements (when opened)
  readonly menuNavigation: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly closeMenuButton: Locator;
  readonly closeMenuIcon: Locator;

  // Cart Items Section
  readonly cartItemsContainer: Locator;
  readonly cartItemsHeader: Locator;
  readonly qtyHeader: Locator;
  readonly descriptionHeader: Locator;
  private readonly cartItems: Locator;

  // Individual Cart Item Elements
  readonly cartItemQuantity: Locator;
  readonly cartItemName: Locator;
  readonly cartItemDescription: Locator;
  readonly cartItemPrice: Locator;
  readonly cartItemLink: Locator;

  // Order Summary Section
  readonly orderSummaryContainer: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly priceTotalLabel: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  // Action Buttons
  readonly cancelButton: Locator;
  readonly cancelIcon: Locator;
  readonly finishButton: Locator;

  // Footer Elements
  readonly footer: Locator;
  readonly socialMediaList: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerCopyright: Locator;

  // Legacy locators for backward compatibility
  private readonly paymentInformation: Locator;
  private readonly shippingInformation: Locator;
  private readonly priceTotal: Locator;

  constructor(page: Page) {
    super(page, '/checkout-step-two.html');
    
    // Header Elements
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.menuIcon = page.locator('.bm-burger-button img');
    this.appLogo = page.locator('.app_logo');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.pageTitle = page.locator('.title');

    // Navigation Menu Elements (when opened)
    this.menuNavigation = page.locator('.bm-menu');
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.closeMenuIcon = page.locator('.bm-cross-button img');

    // Cart Items Section
    this.cartItemsContainer = page.locator('.cart_list');
    this.cartItemsHeader = page.locator('.cart_list .cart_item_label');
    this.qtyHeader = page.locator('.cart_quantity_label');
    this.descriptionHeader = page.locator('.cart_desc_label');
    this.cartItems = page.locator('.cart_item');

    // Individual Cart Item Elements
    this.cartItemQuantity = page.locator('.cart_quantity');
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemDescription = page.locator('.inventory_item_desc');
    this.cartItemPrice = page.locator('.inventory_item_price');
    this.cartItemLink = page.locator('.cart_item .inventory_item_name');

    // Order Summary Section
    this.orderSummaryContainer = page.locator('.summary_info');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.priceTotalLabel = page.locator('.summary_info_label').filter({ hasText: 'Price Total' });
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');

    // Action Buttons
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.cancelIcon = page.locator('[data-test="cancel"] img');
    this.finishButton = page.locator('[data-test="finish"]');

    // Footer Elements
    this.footer = page.locator('footer');
    this.socialMediaList = page.locator('.social');
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedinLink = page.locator('[data-test="social-linkedin"]');
    this.footerCopyright = page.locator('.footer_copy');

    // Legacy locators for backward compatibility
    this.paymentInformation = this.paymentInfoLabel;
    this.shippingInformation = this.shippingInfoLabel;
    this.priceTotal = page.locator('.summary_info_label');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      paymentInfoLabel: this.paymentInfoLabel,
      shippingInfoLabel: this.shippingInfoLabel,
      finishButton: this.finishButton,
      cancelButton: this.cancelButton,
      cartItemsContainer: this.cartItemsContainer,
      orderSummaryContainer: this.orderSummaryContainer
    };
  }

  // ====================
  // PAGE VERIFICATION METHODS
  // ====================

  /**
   * Verify that the user has landed on the Checkout Overview page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.finishButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/checkout-step-two.html');
  }

  /**
   * Verify all header elements are displayed correctly
   */
  async verifyAllHeaderElements(): Promise<void> {
    await expect(this.menuButton).toBeVisible();
    await expect(this.appLogo).toBeVisible();
    await expect(this.appLogo).toHaveText('Swag Labs');
    await expect(this.cartIcon).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  /**
   * Verify cart badge displays correct item count
   */
  async verifyCartBadge(expectedCount: string): Promise<void> {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  /**
   * Verify footer elements are displayed correctly
   */
  async verifyFooterElements(): Promise<void> {
    await expect(this.footer).toBeVisible();
    await expect(this.socialMediaList).toBeVisible();
    await expect(this.twitterLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.footerCopyright).toBeVisible();
  }

  /**
   * Verify complete page structure
   */
  async verifyCompletePageStructure(): Promise<void> {
    await this.verifyAllHeaderElements();
    await this.verifyCartItemsSection();
    await this.verifyOrderSummarySection();
    await this.verifyActionButtons();
    await this.verifyFooterElements();
  }

  // ====================
  // NAVIGATION MENU METHODS
  // ====================

  /**
   * Open the hamburger menu
   */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
    await expect(this.menuNavigation).toBeVisible();
  }

  /**
   * Close the hamburger menu
   */
  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
    await expect(this.menuNavigation).not.toBeVisible();
  }

  /**
   * Verify menu is open
   */
  async verifyMenuOpen(): Promise<void> {
    await expect(this.menuNavigation).toBeVisible();
    await expect(this.allItemsLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.resetAppStateLink).toBeVisible();
  }

  /**
   * Verify menu is closed
   */
  async verifyMenuClosed(): Promise<void> {
    await expect(this.menuNavigation).not.toBeVisible();
  }

  /**
   * Navigate to All Items from menu
   */
  async navigateToAllItems(): Promise<void> {
    await this.openMenu();
    await this.allItemsLink.click();
  }

  /**
   * Logout from menu
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Reset app state from menu
   */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetAppStateLink.click();
    await this.closeMenu();
  }

  /**
   * Navigate to About page from menu
   */
  async navigateToAbout(): Promise<void> {
    await this.openMenu();
    await this.aboutLink.click();
  }

  // ====================
  // CART ITEMS METHODS
  // ====================

  /**
   * Verify cart items section is displayed
   */
  async verifyCartItemsSection(): Promise<void> {
    await expect(this.cartItemsContainer).toBeVisible();
    await expect(this.qtyHeader).toBeVisible();
    await expect(this.qtyHeader).toHaveText('QTY');
    await expect(this.descriptionHeader).toBeVisible();
    await expect(this.descriptionHeader).toHaveText('Description');
  }

  /**
   * Get cart item count
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get cart item by name
   */
  getCartItemByName(productName: string): Locator {
    return this.page.locator('.cart_item', { hasText: productName });
  }

  /**
   * Verify specific item is in checkout overview
   */
  async verifyItemInOverview(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    await expect(cartItem).toBeVisible();
  }

  /**
   * Get all cart item names in overview
   */
  async getCartItemNames(): Promise<string[]> {
    const itemNames = await this.cartItemName.allTextContents();
    return itemNames;
  }

  /**
   * Get all cart item prices
   */
  async getCartItemPrices(): Promise<string[]> {
    const itemPrices = await this.cartItemPrice.allTextContents();
    return itemPrices;
  }

  /**
   * Get all cart item quantities
   */
  async getCartItemQuantities(): Promise<string[]> {
    const quantities = await this.cartItemQuantity.allTextContents();
    return quantities;
  }

  /**
   * Verify cart has specific number of items
   */
  async verifyCartHasItems(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartItemCount();
    expect(actualCount).toBe(expectedCount);
  }

  /**
   * Verify specific item details in cart
   */
  async verifyItemDetails(productName: string, expectedPrice: string, expectedQuantity: string = '1'): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    await expect(cartItem).toBeVisible();
    
    const quantity = cartItem.locator('.cart_quantity');
    const price = cartItem.locator('.inventory_item_price');
    
    await expect(quantity).toHaveText(expectedQuantity);
    await expect(price).toHaveText(expectedPrice);
  }

  /**
   * Click on item name to view details
   */
  async clickItemName(productName: string): Promise<void> {
    const itemLink = this.getCartItemByName(productName).locator('.inventory_item_name');
    await itemLink.click();
  }

  // ====================
  // ORDER SUMMARY METHODS
  // ====================

  /**
   * Verify order summary section is displayed
   */
  async verifyOrderSummarySection(): Promise<void> {
    await expect(this.orderSummaryContainer).toBeVisible();
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.paymentInfoValue).toBeVisible();
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.shippingInfoValue).toBeVisible();
    await expect(this.priceTotalLabel).toBeVisible();
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  /**
   * Get payment information text
   */
  async getPaymentInfo(): Promise<string> {
    return await this.paymentInfoValue.textContent() || '';
  }

  /**
   * Get shipping information text
   */
  async getShippingInfo(): Promise<string> {
    return await this.shippingInfoValue.textContent() || '';
  }

  /**
   * Get subtotal amount
   */
  async getSubtotal(): Promise<string> {
    return await this.subtotalLabel.textContent() || '';
  }

  /**
   * Get tax amount
   */
  async getTax(): Promise<string> {
    return await this.taxLabel.textContent() || '';
  }

  /**
   * Get total amount
   */
  async getTotal(): Promise<string> {
    return await this.totalLabel.textContent() || '';
  }

  /**
   * Get subtotal numeric value
   */
  async getSubtotalValue(): Promise<number> {
    const subtotalText = await this.getSubtotal();
    const match = subtotalText.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get tax numeric value
   */
  async getTaxValue(): Promise<number> {
    const taxText = await this.getTax();
    const match = taxText.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get total numeric value
   */
  async getTotalValue(): Promise<number> {
    const totalText = await this.getTotal();
    const match = totalText.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Verify order calculations are correct
   */
  async verifyOrderCalculations(): Promise<void> {
    const subtotal = await this.getSubtotalValue();
    const tax = await this.getTaxValue();
    const total = await this.getTotalValue();
    
    const calculatedTotal = subtotal + tax;
    expect(Math.abs(total - calculatedTotal)).toBeLessThan(0.01); // Allow for rounding differences
  }

  /**
   * Verify payment information
   */
  async verifyPaymentInformation(expectedPayment: string = 'SauceCard #31337'): Promise<void> {
    await expect(this.paymentInfoLabel).toHaveText('Payment Information:');
    await expect(this.paymentInfoValue).toHaveText(expectedPayment);
  }

  /**
   * Verify shipping information
   */
  async verifyShippingInformation(expectedShipping: string = 'Free Pony Express Delivery!'): Promise<void> {
    await expect(this.shippingInfoLabel).toHaveText('Shipping Information:');
    await expect(this.shippingInfoValue).toHaveText(expectedShipping);
  }

  /**
   * Verify order summary information is displayed
   */
  async verifyOrderSummary(): Promise<void> {
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  // ====================
  // ACTION BUTTON METHODS
  // ====================

  /**
   * Verify action buttons are displayed and enabled
   */
  async verifyActionButtons(): Promise<void> {
    await expect(this.cancelButton).toBeVisible();
    await expect(this.cancelButton).toBeEnabled();
    await expect(this.cancelButton).toContainText('Cancel');
    
    await expect(this.finishButton).toBeVisible();
    await expect(this.finishButton).toBeEnabled();
    await expect(this.finishButton).toHaveText('Finish');
  }

  /**
   * Verify cancel button is enabled
   */
  async verifyCancelButtonEnabled(): Promise<void> {
    await expect(this.cancelButton).toBeEnabled();
  }

  /**
   * Verify finish button is enabled
   */
  async verifyFinishButtonEnabled(): Promise<void> {
    await expect(this.finishButton).toBeEnabled();
  }

  /**
   * Click finish button to complete order
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Click cancel button to return to checkout info
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Complete the checkout process
   */
  async completeCheckout(): Promise<void> {
    await this.verifyPageLoaded();
    await this.verifyOrderSummary();
    await this.clickFinish();
  }

  // ====================
  // NAVIGATION METHODS
  // ====================

  /**
   * Navigate to shopping cart
   */
  async clickShoppingCart(): Promise<void> {
    await this.cartIcon.click();
  }

  // ====================
  // FOOTER METHODS
  // ====================

  /**
   * Verify social media links are functional
   */
  async verifySocialMediaLinks(): Promise<void> {
    await expect(this.twitterLink).toBeVisible();
    await expect(this.twitterLink).toHaveAttribute('href', 'https://twitter.com/saucelabs');
    
    await expect(this.facebookLink).toBeVisible();
    await expect(this.facebookLink).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
    
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
  }

  /**
   * Get footer copyright text
   */
  async getFooterCopyright(): Promise<string> {
    return await this.footerCopyright.textContent() || '';
  }
}
