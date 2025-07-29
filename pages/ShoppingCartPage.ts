import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Shopping Cart Page Object Model for SwagLabs
 */
export class ShoppingCartPage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly cartList: Locator;
  private readonly cartItems: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;
  private readonly cartQuantityLabel: Locator;
  private readonly cartDescLabel: Locator;

  constructor(page: Page) {
    super(page, '/cart.html');
    this.pageTitle = page.locator('.title');
    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartQuantityLabel = page.locator('.cart_quantity_label');
    this.cartDescLabel = page.locator('.cart_desc_label');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      cartList: this.cartList,
      continueShoppingButton: this.continueShoppingButton,
      checkoutButton: this.checkoutButton
    };
  }

  /**
   * Verify that the user has landed on the Shopping Cart page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Your Cart');
    await expect(this.cartList).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/cart.html');
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
   * Remove item from cart by name
   */
  async removeItemFromCart(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    const removeButton = cartItem.locator('[data-test*="remove"]');
    await removeButton.click();
  }

  /**
   * Click continue shopping
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Click checkout
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Get all cart item names
   */
  async getCartItemNames(): Promise<string[]> {
    const itemNames = await this.page.locator('.inventory_item_name').allTextContents();
    return itemNames;
  }

  /**
   * Get cart item price by name
   */
  async getCartItemPrice(productName: string): Promise<string> {
    const cartItem = this.getCartItemByName(productName);
    const priceElement = cartItem.locator('.inventory_item_price');
    return await priceElement.textContent() || '';
  }

  /**
   * Verify cart is empty
   */
  async verifyCartIsEmpty(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    expect(itemCount).toBe(0);
  }

  /**
   * Verify specific item is in cart
   */
  async verifyItemInCart(productName: string): Promise<void> {
    const cartItem = this.getCartItemByName(productName);
    await expect(cartItem).toBeVisible();
  }
}
