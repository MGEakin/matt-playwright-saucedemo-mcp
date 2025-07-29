import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { USERS } from '../utils/testData';

test.describe('Products Page Functional Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    
    // Login with standard user before each test
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await productsPage.verifyPageLoaded();
  });

  test.describe('Page Elements Verification', () => {
    test('@functional should display all header elements correctly', async ({ page }) => {
      await productsPage.verifyHeaderElements();
      
      const pageTitle = await productsPage.getPageTitle();
      expect(pageTitle).toBe('Products');
    });

    test('@functional should display all product items', async ({ page }) => {
      await productsPage.verifyAllProductsDisplayed();
      
      const productCount = await productsPage.getProductCount();
      expect(productCount).toBe(6);
    });

    test('@functional should display product images correctly', async ({ page }) => {
      await productsPage.verifyProductImagesLoaded();
    });

    test('@functional should display product prices in correct format', async ({ page }) => {
      await productsPage.verifyProductPricesFormat();
    });

    test('@functional should display all add to cart buttons', async ({ page }) => {
      await productsPage.verifyAddToCartButtons();
    });

    test('@functional should display footer elements correctly', async ({ page }) => {
      await productsPage.verifyFooterElements();
    });

    test('@functional should display expected product names', async ({ page }) => {
      const productNames = await productsPage.getAllProductNames();
      
      expect(productNames).toContain('Sauce Labs Backpack');
      expect(productNames).toContain('Sauce Labs Bike Light');
      expect(productNames).toContain('Sauce Labs Bolt T-Shirt');
      expect(productNames).toContain('Sauce Labs Fleece Jacket');
      expect(productNames).toContain('Sauce Labs Onesie');
      expect(productNames).toContain('Test.allTheThings() T-Shirt (Red)');
    });
  });

  test.describe('Navigation and Menu Functionality', () => {
    test('@functional should open and close hamburger menu', async ({ page }) => {
      await productsPage.openMenu();
      await productsPage.closeMenu();
    });

    test('@functional should display all menu navigation links', async ({ page }) => {
      await productsPage.verifyMenuLinks();
      await productsPage.closeMenu();
    });

    test('@functional should allow logout from menu', async ({ page }) => {
      await productsPage.logout();
      
      // Verify redirected to login page
      await loginPage.verifyPageLoaded();
    });

    test('@functional should allow reset app state', async ({ page }) => {
      // Add item to cart first
      await productsPage.addBackpackToCart();
      await productsPage.verifyCartBadge('1');
      
      // Reset app state
      await productsPage.resetAppState();
      
      // Verify cart is cleared
      await productsPage.verifyCartBadgeNotVisible();
    });
  });

  test.describe('Product Sorting Functionality', () => {
    test('@functional should display sort options', async ({ page }) => {
      await productsPage.verifySortOptions();
      
      const currentSort = await productsPage.getCurrentSortOption();
      expect(currentSort).toBe('Name (A to Z)');
    });

    test('@functional should sort products by name A to Z', async ({ page }) => {
      await productsPage.sortProducts('az');
      
      const productNames = await productsPage.getAllProductNames();
      const sortedNames = [...productNames].sort();
      expect(productNames).toEqual(sortedNames);
    });

    test('@functional should sort products by name Z to A', async ({ page }) => {
      await productsPage.sortProducts('za');
      
      const productNames = await productsPage.getAllProductNames();
      const sortedNames = [...productNames].sort().reverse();
      expect(productNames).toEqual(sortedNames);
    });

    test('@functional should sort products by price low to high', async ({ page }) => {
      await productsPage.sortProducts('lohi');
      
      const productPrices = await productsPage.getAllProductPrices();
      const numericPrices = productPrices.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...numericPrices].sort((a, b) => a - b);
      expect(numericPrices).toEqual(sortedPrices);
    });

    test('@functional should sort products by price high to low', async ({ page }) => {
      await productsPage.sortProducts('hilo');
      
      const productPrices = await productsPage.getAllProductPrices();
      const numericPrices = productPrices.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...numericPrices].sort((a, b) => b - a);
      expect(numericPrices).toEqual(sortedPrices);
    });
  });

  test.describe('Shopping Cart Functionality', () => {
    test('@functional should not display cart badge when cart is empty', async ({ page }) => {
      await productsPage.verifyCartBadgeNotVisible();
    });

    test('@functional should add single item to cart', async ({ page }) => {
      await productsPage.addBackpackToCart();
      
      await productsPage.verifyCartBadge('1');
    });

    test('@functional should add multiple items to cart', async ({ page }) => {
      await productsPage.addBackpackToCart();
      await productsPage.addBikeLightToCart();
      await productsPage.addBoltTShirtToCart();
      
      await productsPage.verifyCartBadge('3');
    });

    test('@functional should remove item from cart', async ({ page }) => {
      await productsPage.addBackpackToCart();
      await productsPage.verifyCartBadge('1');
      
      await productsPage.removeProductFromCart('Sauce Labs Backpack');
      await productsPage.verifyCartBadgeNotVisible();
    });

    test('@functional should navigate to shopping cart page', async ({ page }) => {
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      
      // Verify navigation to cart page
      expect(page.url()).toContain('/cart.html');
    });
  });

  test.describe('Individual Product Testing', () => {
    test('@functional should add Sauce Labs Backpack to cart', async ({ page }) => {
      await productsPage.addBackpackToCart();
      await productsPage.verifyCartBadge('1');
      
      const details = await productsPage.getProductDetails('Sauce Labs Backpack');
      expect(details.name).toBe('Sauce Labs Backpack');
      expect(details.price).toBe('$29.99');
    });

    test('@functional should add Sauce Labs Bike Light to cart', async ({ page }) => {
      await productsPage.addBikeLightToCart();
      await productsPage.verifyCartBadge('1');
      
      const details = await productsPage.getProductDetails('Sauce Labs Bike Light');
      expect(details.name).toBe('Sauce Labs Bike Light');
      expect(details.price).toBe('$9.99');
    });

    test('@functional should add Sauce Labs Bolt T-Shirt to cart', async ({ page }) => {
      await productsPage.addBoltTShirtToCart();
      await productsPage.verifyCartBadge('1');
      
      const details = await productsPage.getProductDetails('Sauce Labs Bolt T-Shirt');
      expect(details.name).toBe('Sauce Labs Bolt T-Shirt');
      expect(details.price).toBe('$15.99');
    });

    test('@functional should add Sauce Labs Fleece Jacket to cart', async ({ page }) => {
      await productsPage.addFleeceJacketToCart();
      await productsPage.verifyCartBadge('1');
      
      const details = await productsPage.getProductDetails('Sauce Labs Fleece Jacket');
      expect(details.name).toBe('Sauce Labs Fleece Jacket');
      expect(details.price).toBe('$49.99');
    });

    test('@functional should add Sauce Labs Onesie to cart', async ({ page }) => {
      await productsPage.addOnesieToCart();
      await productsPage.verifyCartBadge('1');
      
      const details = await productsPage.getProductDetails('Sauce Labs Onesie');
      expect(details.name).toBe('Sauce Labs Onesie');
      expect(details.price).toBe('$7.99');
    });

    test('@functional should add Test.allTheThings() T-Shirt (Red) to cart', async ({ page }) => {
      await productsPage.addRedTShirtToCart();
      await productsPage.verifyCartBadge('1');
      
      const details = await productsPage.getProductDetails('Test.allTheThings() T-Shirt (Red)');
      expect(details.name).toBe('Test.allTheThings() T-Shirt (Red)');
      expect(details.price).toBe('$15.99');
    });
  });

  test.describe('Product Navigation', () => {
    test('@functional should navigate to product details via title click', async ({ page }) => {
      await productsPage.clickProductTitle('Sauce Labs Backpack');
      
      // Verify navigation to product details page
      expect(page.url()).toContain('/inventory-item.html');
    });

    test('@functional should navigate to product details via image click', async ({ page }) => {
      await productsPage.clickProductImage('Sauce Labs Bike Light');
      
      // Verify navigation to product details page
      expect(page.url()).toContain('/inventory-item.html');
    });
  });

  test.describe('Footer Functionality', () => {
    test('@functional should display correct footer copyright', async ({ page }) => {
      const copyright = await productsPage.getFooterCopyright();
      expect(copyright).toContain('© 2025 Sauce Labs. All Rights Reserved.');
      expect(copyright).toContain('Terms of Service');
      expect(copyright).toContain('Privacy Policy');
    });

    test('@functional should have functional social media links', async ({ page }) => {
      // Note: These will open in new tabs, so we're just verifying they're clickable
      await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
      await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
      await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('@functional should handle adding all products to cart', async ({ page }) => {
      await productsPage.addBackpackToCart();
      await productsPage.addBikeLightToCart();
      await productsPage.addBoltTShirtToCart();
      await productsPage.addFleeceJacketToCart();
      await productsPage.addOnesieToCart();
      await productsPage.addRedTShirtToCart();
      
      await productsPage.verifyCartBadge('6');
    });

    test('@functional should handle removing all products from cart', async ({ page }) => {
      // Add all products
      await productsPage.addBackpackToCart();
      await productsPage.addBikeLightToCart();
      await productsPage.addBoltTShirtToCart();
      await productsPage.verifyCartBadge('3');
      
      // Remove all products
      await productsPage.removeProductFromCart('Sauce Labs Backpack');
      await productsPage.removeProductFromCart('Sauce Labs Bike Light');
      await productsPage.removeProductFromCart('Sauce Labs Bolt T-Shirt');
      
      await productsPage.verifyCartBadgeNotVisible();
    });

    test('@functional should maintain cart state across page operations', async ({ page }) => {
      await productsPage.addBackpackToCart();
      await productsPage.verifyCartBadge('1');
      
      // Open and close menu
      await productsPage.openMenu();
      await productsPage.closeMenu();
      
      // Change sort order
      await productsPage.sortProducts('za');
      
      // Verify cart state is maintained
      await productsPage.verifyCartBadge('1');
    });
  });

  test.describe('Accessibility and Usability', () => {
    test('@functional should have accessible button states', async ({ page }) => {
      // Verify add to cart button
      const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
      await expect(addButton).toBeVisible();
      await expect(addButton).toBeEnabled();
      await expect(addButton).toHaveText('Add to cart');
      
      // Add to cart and verify button changes to Remove
      await addButton.click();
      
      const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
      await expect(removeButton).toBeVisible();
      await expect(removeButton).toBeEnabled();
      await expect(removeButton).toHaveText('Remove');
    });

    test('@functional should have keyboard navigation support', async ({ page }) => {
      // Test tab navigation through products
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Verify focus is on a product element
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('@functional should display product information clearly', async ({ page }) => {
      const productDetails = await productsPage.getProductDetails('Sauce Labs Backpack');
      
      expect(productDetails.name).toBeTruthy();
      expect(productDetails.description).toBeTruthy();
      expect(productDetails.price).toBeTruthy();
      expect(productDetails.description.length).toBeGreaterThan(10);
    });
  });
});
