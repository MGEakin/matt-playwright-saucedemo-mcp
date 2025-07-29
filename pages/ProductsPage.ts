import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Products Page Object Model for SwagLabs
 */
export class ProductsPage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly inventoryContainer: Locator;
  private readonly productItems: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly menuButton: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page, '/inventory.html');
    this.pageTitle = page.locator('.title');
    this.inventoryContainer = page.locator('.inventory_container');
    this.productItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      inventoryContainer: this.inventoryContainer,
      shoppingCartLink: this.shoppingCartLink,
      menuButton: this.menuButton
    };
  }

  /**
   * Verify that the user has landed on the Products page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
    await expect(this.menuButton).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/inventory.html');
  }

  /**
   * Get product item by name
   */
  getProductByName(productName: string): Locator {
    return this.page.locator('.inventory_item', { hasText: productName });
  }

  /**
   * Add product to cart by name
   */
  async addProductToCart(productName: string): Promise<void> {
    const product = this.getProductByName(productName);
    const addToCartButton = product.locator('[data-test*="add-to-cart"]');
    await addToCartButton.click();
  }

  /**
   * Click on product to view details
   */
  async clickProductName(productName: string): Promise<void> {
    const productLink = this.page.locator('.inventory_item_name', { hasText: productName });
    await productLink.click();
  }

  /**
   * Get shopping cart badge count
   */
  async getCartItemCount(): Promise<string> {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent() || '0';
    }
    return '0';
  }

  /**
   * Click shopping cart
   */
  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Get all product names
   */
  async getAllProductNames(): Promise<string[]> {
    const productNames = await this.page.locator('.inventory_item_name').allTextContents();
    return productNames;
  }

  /**
   * Sort products by option
   */
  async sortProducts(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }
}
