import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Overview Page Object Model for SwagLabs
 */
export class CheckoutOverviewPage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly paymentInformation: Locator;
  private readonly shippingInformation: Locator;
  private readonly priceTotal: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly cancelButton: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page, '/checkout-step-two.html');
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.paymentInformation = page.locator('[data-test="payment-info-label"]');
    this.shippingInformation = page.locator('[data-test="shipping-info-label"]');
    this.priceTotal = page.locator('.summary_info_label');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      paymentInformation: this.paymentInformation,
      shippingInformation: this.shippingInformation,
      finishButton: this.finishButton,
      cancelButton: this.cancelButton
    };
  }

  /**
   * Verify that the user has landed on the Checkout Overview page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
    await expect(this.paymentInformation).toBeVisible();
    await expect(this.shippingInformation).toBeVisible();
    await expect(this.finishButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/checkout-step-two.html');
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
   * Click finish button
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Verify order summary information is displayed
   */
  async verifyOrderSummary(): Promise<void> {
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  /**
   * Get all cart item names in overview
   */
  async getCartItemNames(): Promise<string[]> {
    const itemNames = await this.page.locator('.inventory_item_name').allTextContents();
    return itemNames;
  }

  /**
   * Verify specific item is in checkout overview
   */
  async verifyItemInOverview(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    await expect(cartItem).toBeVisible();
  }

  /**
   * Get payment information text
   */
  async getPaymentInfo(): Promise<string> {
    const paymentValue = this.page.locator('[data-test="payment-info-value"]');
    return await paymentValue.textContent() || '';
  }

  /**
   * Get shipping information text
   */
  async getShippingInfo(): Promise<string> {
    const shippingValue = this.page.locator('[data-test="shipping-info-value"]');
    return await shippingValue.textContent() || '';
  }
}
