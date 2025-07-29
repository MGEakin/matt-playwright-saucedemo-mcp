import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { USERS } from '../utils/testData';

/**
 * Product Details Page Functional Tests
 * Comprehensive test suite covering all Product Details page functionality
 * Enhanced based on MCP server analysis
 */
test.describe('Product Details Page Functional Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    // Navigate to login page and login
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    
    // Navigate to product details page for Sauce Labs Backpack
    await productsPage.clickProductTitle('Sauce Labs Backpack');
    await productDetailsPage.verifyPageLoaded();
  });

  test.describe('Page Elements Verification', () => {
    test('@functional should display all header elements correctly', async () => {
      await productDetailsPage.verifyAllHeaderElements();
    });

    test('@functional should display back to products button', async () => {
      await productDetailsPage.verifyBackButton();
    });

    test('@functional should display product details section correctly', async () => {
      await productDetailsPage.verifyProductDetailsSection();
    });

    test('@functional should display product image with correct attributes', async () => {
      await productDetailsPage.verifyProductImageLoaded();
      
      const imageSrc = await productDetailsPage.getProductImageSrc();
      const imageAlt = await productDetailsPage.getProductImageAlt();
      
      expect(imageSrc).toContain('sauce-backpack');
      expect(imageAlt).toBe('Sauce Labs Backpack');
    });

    test('@functional should display product information correctly', async () => {
      const productName = await productDetailsPage.getProductName();
      const productDescription = await productDetailsPage.getProductDescription();
      const productPrice = await productDetailsPage.getProductPrice();
      
      expect(productName).toBe('Sauce Labs Backpack');
      expect(productDescription).toContain('carry.allTheThings()');
      expect(productPrice).toBe('$29.99');
    });

    test('@functional should display footer elements correctly', async () => {
      await productDetailsPage.verifyFooterElements();
    });

    test('@functional should have correct product ID in URL', async () => {
      const productId = await productDetailsPage.getProductId();
      expect(productId).toBe('4'); // Sauce Labs Backpack has ID 4
    });

    test('@functional should display price in correct format', async () => {
      await productDetailsPage.verifyPriceFormat();
    });
  });

  test.describe('Navigation and Menu Functionality', () => {
    test('@functional should open and close hamburger menu', async () => {
      // Verify menu starts closed
      await productDetailsPage.verifyMenuClosed();
      
      // Open menu
      await productDetailsPage.openMenu();
      await productDetailsPage.verifyMenuOpen();
      
      // Close menu
      await productDetailsPage.closeMenu();
      await productDetailsPage.verifyMenuClosed();
    });

    test('@functional should navigate back to products page', async () => {
      await productDetailsPage.clickBackToProducts();
      await productsPage.verifyPageLoaded();
    });

    test('@functional should navigate to shopping cart from header', async () => {
      await productDetailsPage.navigateToCart();
      expect(productDetailsPage.getCurrentUrl()).toContain('/cart.html');
    });

    test('@functional should allow logout from menu', async () => {
      await productDetailsPage.logout();
      await loginPage.verifyPageLoaded();
    });

    test('@functional should allow reset app state from menu', async () => {
      // Add product to cart first
      await productDetailsPage.addToCart();
      await productDetailsPage.verifyCartBadge('1');
      
      // Reset app state
      await productDetailsPage.resetAppState();
      
      // Verify cart is cleared
      await productDetailsPage.verifyCartBadgeNotVisible();
    });

    test('@functional should navigate to All Items from menu', async () => {
      await productDetailsPage.navigateToAllItems();
      await productsPage.verifyPageLoaded();
    });
  });

  test.describe('Product Cart Functionality', () => {
    test('@functional should start with correct button state when product not in cart', async () => {
      // First remove product if it's in cart
      if (await productDetailsPage.isProductInCart()) {
        await productDetailsPage.removeFromCart();
      }
      
      await productDetailsPage.verifyButtonState(false);
      await productDetailsPage.verifyCartBadgeNotVisible();
    });

    test('@functional should add product to cart', async () => {
      // Ensure product starts not in cart
      if (await productDetailsPage.isProductInCart()) {
        await productDetailsPage.removeFromCart();
      }
      
      await productDetailsPage.addToCart();
      await productDetailsPage.verifyButtonState(true);
      await productDetailsPage.verifyCartBadge('1');
    });

    test('@functional should remove product from cart', async () => {
      // Ensure product starts in cart
      if (!await productDetailsPage.isProductInCart()) {
        await productDetailsPage.addToCart();
      }
      
      await productDetailsPage.removeFromCart();
      await productDetailsPage.verifyButtonState(false);
      await productDetailsPage.verifyCartBadgeNotVisible();
    });

    test('@functional should maintain cart state across page operations', async () => {
      // Add product to cart
      if (!await productDetailsPage.isProductInCart()) {
        await productDetailsPage.addToCart();
      }
      
      // Navigate back and forth
      await productDetailsPage.clickBackToProducts();
      await productsPage.clickProductTitle('Sauce Labs Backpack');
      
      // Verify cart state maintained
      await productDetailsPage.verifyButtonState(true);
      await productDetailsPage.verifyCartBadge('1');
    });

    test('@functional should update cart count correctly', async () => {
      // Start with empty cart
      if (await productDetailsPage.isProductInCart()) {
        await productDetailsPage.removeFromCart();
      }
      
      // Go to products page and add another item
      await productDetailsPage.clickBackToProducts();
      await productsPage.addBikeLightToCart();
      
      // Go back to backpack details
      await productsPage.clickProductTitle('Sauce Labs Backpack');
      
      // Add backpack to cart
      await productDetailsPage.addToCart();
      
      // Should show count of 2
      await productDetailsPage.verifyCartBadge('2');
    });
  });

  test.describe('Different Product Testing', () => {
    test('@functional should display Sauce Labs Bike Light details correctly', async () => {
      // Navigate to bike light
      await productDetailsPage.clickBackToProducts();
      await productsPage.clickProductTitle('Sauce Labs Bike Light');
      
      const productName = await productDetailsPage.getProductName();
      const productPrice = await productDetailsPage.getProductPrice();
      
      expect(productName).toBe('Sauce Labs Bike Light');
      expect(productPrice).toBe('$9.99');
      
      const productId = await productDetailsPage.getProductId();
      expect(productId).toBe('0'); // Bike Light has ID 0
    });

    test('@functional should display Sauce Labs Bolt T-Shirt details correctly', async () => {
      // Navigate to bolt t-shirt
      await productDetailsPage.clickBackToProducts();
      await productsPage.clickProductTitle('Sauce Labs Bolt T-Shirt');
      
      const productName = await productDetailsPage.getProductName();
      const productPrice = await productDetailsPage.getProductPrice();
      
      expect(productName).toBe('Sauce Labs Bolt T-Shirt');
      expect(productPrice).toBe('$15.99');
      
      const productId = await productDetailsPage.getProductId();
      expect(productId).toBe('1'); // Bolt T-Shirt has ID 1
    });

    test('@functional should display Sauce Labs Fleece Jacket details correctly', async () => {
      // Navigate to fleece jacket
      await productDetailsPage.clickBackToProducts();
      await productsPage.clickProductTitle('Sauce Labs Fleece Jacket');
      
      const productName = await productDetailsPage.getProductName();
      const productPrice = await productDetailsPage.getProductPrice();
      
      expect(productName).toBe('Sauce Labs Fleece Jacket');
      expect(productPrice).toBe('$49.99');
      
      const productId = await productDetailsPage.getProductId();
      expect(productId).toBe('5'); // Fleece Jacket has ID 5
    });

    test('@functional should display Sauce Labs Onesie details correctly', async () => {
      // Navigate to onesie
      await productDetailsPage.clickBackToProducts();
      await productsPage.clickProductTitle('Sauce Labs Onesie');
      
      const productName = await productDetailsPage.getProductName();
      const productPrice = await productDetailsPage.getProductPrice();
      
      expect(productName).toBe('Sauce Labs Onesie');
      expect(productPrice).toBe('$7.99');
      
      const productId = await productDetailsPage.getProductId();
      expect(productId).toBe('2'); // Onesie has ID 2
    });

    test('@functional should display Test.allTheThings() T-Shirt details correctly', async () => {
      // Navigate to red t-shirt
      await productDetailsPage.clickBackToProducts();
      await productsPage.clickProductTitle('Test.allTheThings() T-Shirt (Red)');
      
      const productName = await productDetailsPage.getProductName();
      const productPrice = await productDetailsPage.getProductPrice();
      
      expect(productName).toBe('Test.allTheThings() T-Shirt (Red)');
      expect(productPrice).toBe('$15.99');
      
      const productId = await productDetailsPage.getProductId();
      expect(productId).toBe('3'); // Red T-Shirt has ID 3
    });
  });

  test.describe('Footer Functionality', () => {
    test('@functional should have functional social media links', async () => {
      await productDetailsPage.verifySocialMediaLinks();
    });

    test('@functional should display correct footer copyright', async () => {
      const footerText = await productDetailsPage.footerCopyright.textContent();
      expect(footerText).toContain('© 2025 Sauce Labs. All Rights Reserved.');
      expect(footerText).toContain('Terms of Service');
      expect(footerText).toContain('Privacy Policy');
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('@functional should handle multiple cart operations correctly', async () => {
      // Remove if in cart
      if (await productDetailsPage.isProductInCart()) {
        await productDetailsPage.removeFromCart();
      }
      
      // Add to cart
      await productDetailsPage.addToCart();
      await productDetailsPage.verifyCartBadge('1');
      
      // Remove from cart
      await productDetailsPage.removeFromCart();
      await productDetailsPage.verifyCartBadgeNotVisible();
      
      // Add again
      await productDetailsPage.addToCart();
      await productDetailsPage.verifyCartBadge('1');
    });

    test('@functional should maintain page state after menu operations', async () => {
      const originalProduct = await productDetailsPage.getProductName();
      
      // Open and close menu
      await productDetailsPage.openMenu();
      await productDetailsPage.closeMenu();
      
      // Verify still on same product
      const currentProduct = await productDetailsPage.getProductName();
      expect(currentProduct).toBe(originalProduct);
    });

    test('@functional should handle direct URL navigation', async () => {
      // Navigate directly to a product details page
      await productDetailsPage.navigate('?id=2'); // Onesie
      await productDetailsPage.verifyPageLoaded();
      
      const productName = await productDetailsPage.getProductName();
      expect(productName).toBe('Sauce Labs Onesie');
    });
  });

  test.describe('Accessibility and Usability', () => {
    test('@functional should have accessible button states', async () => {
      // Test add to cart button
      if (await productDetailsPage.isProductInCart()) {
        await productDetailsPage.removeFromCart();
      }
      
      await productDetailsPage.verifyAddToCartButtonVisible();
      
      // Test remove button after adding
      await productDetailsPage.addToCart();
      await productDetailsPage.verifyRemoveButtonVisible();
    });

    test('@functional should have keyboard navigation support', async () => {
      // Test tab navigation to buttons
      await productDetailsPage.backButton.focus();
      await expect(productDetailsPage.backButton).toBeFocused();
      
      if (!await productDetailsPage.isProductInCart()) {
        await productDetailsPage.addButton.focus();
        await expect(productDetailsPage.addButton).toBeFocused();
      }
    });

    test('@functional should display product information clearly', async () => {
      await productDetailsPage.verifyProductInformation();
      
      // Verify all essential information is present
      const name = await productDetailsPage.getProductName();
      const description = await productDetailsPage.getProductDescription();
      const price = await productDetailsPage.getProductPrice();
      
      expect(name).toBeTruthy();
      expect(description).toBeTruthy();
      expect(price).toBeTruthy();
    });

    test('@functional should have proper page structure', async () => {
      await productDetailsPage.verifyCompletePageStructure();
    });
  });

  test.describe('Browser Compatibility', () => {
    test('@functional should handle page refresh correctly', async () => {
      const originalProduct = await productDetailsPage.getProductName();
      
      // Add to cart
      if (!await productDetailsPage.isProductInCart()) {
        await productDetailsPage.addToCart();
      }
      
      // Refresh page
      await productDetailsPage.getPage().reload();
      await productDetailsPage.verifyPageLoaded();
      
      // Verify product and cart state maintained
      const currentProduct = await productDetailsPage.getProductName();
      expect(currentProduct).toBe(originalProduct);
      await productDetailsPage.verifyButtonState(true);
    });

    test('@functional should maintain state across browser back/forward', async () => {
      // Add to cart
      if (!await productDetailsPage.isProductInCart()) {
        await productDetailsPage.addToCart();
      }
      
      // Go to products page
      await productDetailsPage.clickBackToProducts();
      
      // Use browser back
      await productDetailsPage.getPage().goBack();
      await productDetailsPage.verifyPageLoaded();
      
      // Verify cart state maintained
      await productDetailsPage.verifyButtonState(true);
    });
  });
});
