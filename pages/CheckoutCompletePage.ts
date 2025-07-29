import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Complete Page Object Model for SwagLabs
 */
export class CheckoutCompletePage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly completeImage: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page, '/checkout-complete.html');
    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.completeImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      completeHeader: this.completeHeader,
      completeText: this.completeText,
      backHomeButton: this.backHomeButton
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
    expect(this.getCurrentUrl()).toContain('/checkout-complete.html');
  }

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
   * Click back home button
   */
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
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
   * Verify successful checkout flow completion
   */
  async verifySuccessfulCheckout(): Promise<void> {
    await this.verifyPageLoaded();
    await this.verifyOrderCompletion();
  }
}
