import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Product Details Page Object Model for SwagLabs
 */
export class ProductDetailsPage extends BasePage {
  // Locators
  private readonly backToProductsButton: Locator;
  private readonly inventoryDetailsContainer: Locator;
  private readonly inventoryDetailsName: Locator;
  private readonly inventoryDetailsDesc: Locator;
  private readonly inventoryDetailsPrice: Locator;
  private readonly inventoryDetailsImg: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;

  constructor(page: Page) {
    super(page, '/inventory-item.html');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.inventoryDetailsContainer = page.locator('.inventory_details_container');
    this.inventoryDetailsName = page.locator('.inventory_details_name');
    this.inventoryDetailsDesc = page.locator('.inventory_details_desc');
    this.inventoryDetailsPrice = page.locator('.inventory_details_price');
    this.inventoryDetailsImg = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('[data-test*="add-to-cart"]');
    this.removeButton = page.locator('[data-test*="remove"]');
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
}
