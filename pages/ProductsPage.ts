import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Products Page Object Model for SwagLabs
 * Enhanced with comprehensive element coverage through MCP server analysis
 */
export class ProductsPage extends BasePage {
  // Header Elements
  private readonly headerContainer: Locator;
  private readonly primaryHeader: Locator;
  private readonly secondaryHeader: Locator;
  private readonly appLogo: Locator;
  private readonly pageTitle: Locator;
  
  // Navigation Elements
  private readonly menuButton: Locator;
  private readonly openMenuImage: Locator;
  private readonly closeMenuButton: Locator;
  private readonly closeMenuImage: Locator;
  private readonly menuNavigation: Locator;
  private readonly allItemsLink: Locator;
  private readonly aboutLink: Locator;
  private readonly logoutLink: Locator;
  private readonly resetAppStateLink: Locator;
  
  // Shopping Cart Elements
  private readonly shoppingCartLink: Locator;
  private readonly shoppingCartBadge: Locator;
  
  // Sorting Elements
  private readonly sortContainer: Locator;
  private readonly sortDropdown: Locator;
  private readonly activeOption: Locator;
  
  // Inventory Elements
  private readonly inventoryContainer: Locator;
  private readonly inventoryList: Locator;
  private readonly productItems: Locator;
  
  // Product Item Elements (dynamic locators)
  private readonly productImages: Locator;
  private readonly productTitles: Locator;
  private readonly productDescriptions: Locator;
  private readonly productPrices: Locator;
  private readonly addToCartButtons: Locator;
  private readonly removeButtons: Locator;
  
  // Individual Product Locators (by data-test)
  private readonly backpackImage: Locator;
  private readonly backpackTitle: Locator;
  private readonly backpackDescription: Locator;
  private readonly backpackPrice: Locator;
  private readonly backpackAddToCartButton: Locator;
  
  private readonly bikeLightImage: Locator;
  private readonly bikeLightTitle: Locator;
  private readonly bikeLightDescription: Locator;
  private readonly bikeLightPrice: Locator;
  private readonly bikeLightAddToCartButton: Locator;
  
  private readonly boltTShirtImage: Locator;
  private readonly boltTShirtTitle: Locator;
  private readonly boltTShirtDescription: Locator;
  private readonly boltTShirtPrice: Locator;
  private readonly boltTShirtAddToCartButton: Locator;
  
  private readonly fleeceJacketImage: Locator;
  private readonly fleeceJacketTitle: Locator;
  private readonly fleeceJacketDescription: Locator;
  private readonly fleeceJacketPrice: Locator;
  private readonly fleeceJacketAddToCartButton: Locator;
  
  private readonly onesieImage: Locator;
  private readonly onesieTitle: Locator;
  private readonly onesieDescription: Locator;
  private readonly onesiePrice: Locator;
  private readonly onesieAddToCartButton: Locator;
  
  private readonly redTShirtImage: Locator;
  private readonly redTShirtTitle: Locator;
  private readonly redTShirtDescription: Locator;
  private readonly redTShirtPrice: Locator;
  private readonly redTShirtAddToCartButton: Locator;
  
  // Footer Elements
  private readonly footer: Locator;
  private readonly footerSocialLinks: Locator;
  private readonly twitterLink: Locator;
  private readonly facebookLink: Locator;
  private readonly linkedinLink: Locator;
  private readonly footerCopy: Locator;

  constructor(page: Page) {
    super(page, '/inventory.html');
    
    // Header Elements
    this.headerContainer = page.locator('[data-test="header-container"]');
    this.primaryHeader = page.locator('[data-test="primary-header"]');
    this.secondaryHeader = page.locator('[data-test="secondary-header"]');
    this.appLogo = page.locator('.app_logo');
    this.pageTitle = page.locator('[data-test="title"]');
    
    // Navigation Elements
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.openMenuImage = page.locator('[data-test="open-menu"]');
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.closeMenuImage = page.locator('[data-test="close-menu"]');
    this.menuNavigation = page.locator('.bm-menu-wrap nav');
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
    
    // Shopping Cart Elements
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    
    // Sorting Elements
    this.sortContainer = page.locator('.header_secondary_container .right_component');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.activeOption = page.locator('[data-test="active-option"]');
    
    // Inventory Elements
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    
    // Product Item Elements (dynamic locators)
    this.productImages = page.locator('[data-test*="inventory-item"][data-test*="img"]');
    this.productTitles = page.locator('[data-test="inventory-item-name"]');
    this.productDescriptions = page.locator('[data-test="inventory-item-desc"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButtons = page.locator('[data-test*="add-to-cart"]');
    this.removeButtons = page.locator('[data-test*="remove"]');
    
    // Individual Product Locators
    this.backpackImage = page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]');
    this.backpackTitle = page.locator('[data-test="item-4-title-link"]');
    this.backpackDescription = this.backpackTitle.locator('../..').locator('[data-test="inventory-item-desc"]');
    this.backpackPrice = this.backpackTitle.locator('../..').locator('[data-test="inventory-item-price"]');
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    this.bikeLightImage = page.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]');
    this.bikeLightTitle = page.locator('[data-test="item-0-title-link"]');
    this.bikeLightDescription = this.bikeLightTitle.locator('../..').locator('[data-test="inventory-item-desc"]');
    this.bikeLightPrice = this.bikeLightTitle.locator('../..').locator('[data-test="inventory-item-price"]');
    this.bikeLightAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    this.boltTShirtImage = page.locator('[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]');
    this.boltTShirtTitle = page.locator('[data-test="item-1-title-link"]');
    this.boltTShirtDescription = this.boltTShirtTitle.locator('../..').locator('[data-test="inventory-item-desc"]');
    this.boltTShirtPrice = this.boltTShirtTitle.locator('../..').locator('[data-test="inventory-item-price"]');
    this.boltTShirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    
    this.fleeceJacketImage = page.locator('[data-test="inventory-item-sauce-labs-fleece-jacket-img"]');
    this.fleeceJacketTitle = page.locator('[data-test="item-5-title-link"]');
    this.fleeceJacketDescription = this.fleeceJacketTitle.locator('../..').locator('[data-test="inventory-item-desc"]');
    this.fleeceJacketPrice = this.fleeceJacketTitle.locator('../..').locator('[data-test="inventory-item-price"]');
    this.fleeceJacketAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    
    this.onesieImage = page.locator('[data-test="inventory-item-sauce-labs-onesie-img"]');
    this.onesieTitle = page.locator('[data-test="item-2-title-link"]');
    this.onesieDescription = this.onesieTitle.locator('../..').locator('[data-test="inventory-item-desc"]');
    this.onesiePrice = this.onesieTitle.locator('../..').locator('[data-test="inventory-item-price"]');
    this.onesieAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
    
    this.redTShirtImage = page.locator('[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]');
    this.redTShirtTitle = page.locator('[data-test="item-3-title-link"]');
    this.redTShirtDescription = this.redTShirtTitle.locator('../..').locator('[data-test="inventory-item-desc"]');
    this.redTShirtPrice = this.redTShirtTitle.locator('../..').locator('[data-test="inventory-item-price"]');
    this.redTShirtAddToCartButton = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    
    // Footer Elements
    this.footer = page.locator('[data-test="footer"]');
    this.footerSocialLinks = page.locator('[data-test="footer"] ul');
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedinLink = page.locator('[data-test="social-linkedin"]');
    this.footerCopy = page.locator('[data-test="footer-copy"]');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      inventoryContainer: this.inventoryContainer,
      shoppingCartLink: this.shoppingCartLink,
      menuButton: this.menuButton,
      headerContainer: this.headerContainer,
      footer: this.footer
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

  // Header and Navigation Methods
  
  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  /**
   * Verify header elements are visible
   */
  async verifyHeaderElements(): Promise<void> {
    await expect(this.headerContainer).toBeVisible();
    await expect(this.primaryHeader).toBeVisible();
    await expect(this.secondaryHeader).toBeVisible();
    await expect(this.appLogo).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
  }

  /**
   * Open hamburger menu
   */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
    await expect(this.menuNavigation).toBeVisible();
  }

  /**
   * Close hamburger menu
   */
  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
    await expect(this.menuNavigation).not.toBeVisible();
  }

  /**
   * Verify menu navigation links
   */
  async verifyMenuLinks(): Promise<void> {
    await this.openMenu();
    await expect(this.allItemsLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.resetAppStateLink).toBeVisible();
  }

  /**
   * Click logout from menu
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Reset app state
   */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetAppStateLink.click();
    await this.closeMenu();
  }

  // Shopping Cart Methods

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
   * Verify shopping cart badge is visible with count
   */
  async verifyCartBadge(expectedCount: string): Promise<void> {
    await expect(this.shoppingCartBadge).toBeVisible();
    await expect(this.shoppingCartBadge).toHaveText(expectedCount);
  }

  /**
   * Verify shopping cart badge is not visible (no items in cart)
   */
  async verifyCartBadgeNotVisible(): Promise<void> {
    await expect(this.shoppingCartBadge).not.toBeVisible();
  }

  /**
   * Click shopping cart link
   */
  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  // Sorting Methods

  /**
   * Get current sort option
   */
  async getCurrentSortOption(): Promise<string> {
    return await this.activeOption.textContent() || '';
  }

  /**
   * Sort products by option
   */
  async sortProducts(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Verify sort options are available
   */
  async verifySortOptions(): Promise<void> {
    await expect(this.sortDropdown).toBeVisible();
    await expect(this.activeOption).toBeVisible();
    
    const options = await this.sortDropdown.locator('option').allTextContents();
    expect(options).toContain('Name (A to Z)');
    expect(options).toContain('Name (Z to A)');
    expect(options).toContain('Price (low to high)');
    expect(options).toContain('Price (high to low)');
  }

  // Product Methods

  /**
   * Get all product names
   */
  async getAllProductNames(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  /**
   * Get all product prices
   */
  async getAllProductPrices(): Promise<string[]> {
    return await this.productPrices.allTextContents();
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /**
   * Verify all products are displayed
   */
  async verifyAllProductsDisplayed(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.inventoryList).toBeVisible();
    
    const productCount = await this.getProductCount();
    expect(productCount).toBe(6); // SwagLabs has 6 products
    
    // Verify each product has required elements
    for (let i = 0; i < productCount; i++) {
      const product = this.productItems.nth(i);
      await expect(product.locator('[data-test="inventory-item-name"]')).toBeVisible();
      await expect(product.locator('[data-test="inventory-item-desc"]')).toBeVisible();
      await expect(product.locator('[data-test="inventory-item-price"]')).toBeVisible();
      await expect(product.locator('[data-test*="add-to-cart"]')).toBeVisible();
    }
  }

  /**
   * Get product item by name
   */
  getProductByName(productName: string): Locator {
    return this.productItems.filter({ hasText: productName });
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
   * Remove product from cart by name
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const product = this.getProductByName(productName);
    const removeButton = product.locator('[data-test*="remove"]');
    await removeButton.click();
  }

  /**
   * Click product title to view details
   */
  async clickProductTitle(productName: string): Promise<void> {
    const product = this.getProductByName(productName);
    const titleLink = product.locator('[data-test*="title-link"]');
    await titleLink.click();
  }

  /**
   * Click product image to view details
   */
  async clickProductImage(productName: string): Promise<void> {
    const product = this.getProductByName(productName);
    const imageLink = product.locator('[data-test*="img-link"]');
    await imageLink.click();
  }

  // Specific Product Methods

  /**
   * Add Sauce Labs Backpack to cart
   */
  async addBackpackToCart(): Promise<void> {
    await this.backpackAddToCartButton.click();
  }

  /**
   * Add Sauce Labs Bike Light to cart
   */
  async addBikeLightToCart(): Promise<void> {
    await this.bikeLightAddToCartButton.click();
  }

  /**
   * Add Sauce Labs Bolt T-Shirt to cart
   */
  async addBoltTShirtToCart(): Promise<void> {
    await this.boltTShirtAddToCartButton.click();
  }

  /**
   * Add Sauce Labs Fleece Jacket to cart
   */
  async addFleeceJacketToCart(): Promise<void> {
    await this.fleeceJacketAddToCartButton.click();
  }

  /**
   * Add Sauce Labs Onesie to cart
   */
  async addOnesieToCart(): Promise<void> {
    await this.onesieAddToCartButton.click();
  }

  /**
   * Add Test.allTheThings() T-Shirt (Red) to cart
   */
  async addRedTShirtToCart(): Promise<void> {
    await this.redTShirtAddToCartButton.click();
  }

  /**
   * Get specific product details
   */
  async getProductDetails(productName: string): Promise<{name: string, description: string, price: string}> {
    const product = this.getProductByName(productName);
    const name = await product.locator('[data-test="inventory-item-name"]').textContent() || '';
    const description = await product.locator('[data-test="inventory-item-desc"]').textContent() || '';
    const price = await product.locator('[data-test="inventory-item-price"]').textContent() || '';
    
    return { name, description, price };
  }

  // Footer Methods

  /**
   * Verify footer elements
   */
  async verifyFooterElements(): Promise<void> {
    await expect(this.footer).toBeVisible();
    await expect(this.footerSocialLinks).toBeVisible();
    await expect(this.twitterLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
  }

  /**
   * Click social media links
   */
  async clickTwitterLink(): Promise<void> {
    await this.twitterLink.click();
  }

  async clickFacebookLink(): Promise<void> {
    await this.facebookLink.click();
  }

  async clickLinkedInLink(): Promise<void> {
    await this.linkedinLink.click();
  }

  /**
   * Get footer copyright text
   */
  async getFooterCopyright(): Promise<string> {
    return await this.footerCopy.textContent() || '';
  }

  // Verification Methods

  /**
   * Verify product images are loaded
   */
  async verifyProductImagesLoaded(): Promise<void> {
    const imageCount = await this.productImages.count();
    for (let i = 0; i < imageCount; i++) {
      const image = this.productImages.nth(i);
      await expect(image).toBeVisible();
      // Verify image has src attribute
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();
    }
  }

  /**
   * Verify product prices are formatted correctly
   */
  async verifyProductPricesFormat(): Promise<void> {
    const prices = await this.getAllProductPrices();
    for (const price of prices) {
      // Verify price starts with $ and is a valid format like $29.99
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    }
  }

  /**
   * Verify all add to cart buttons are functional
   */
  async verifyAddToCartButtons(): Promise<void> {
    const buttonCount = await this.addToCartButtons.count();
    for (let i = 0; i < buttonCount; i++) {
      const button = this.addToCartButtons.nth(i);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
      await expect(button).toHaveText('Add to cart');
    }
  }
}
