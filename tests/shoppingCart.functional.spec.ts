import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { USERS } from '../utils/testData';

/**
 * Shopping Cart Page Functional Tests
 * Comprehensive test suite covering all Shopping Cart page functionality
 * Enhanced based on MCP server analysis
 */
test.describe('Shopping Cart Page Functional Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);

    // Navigate to login page and login
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    
    // Navigate to cart page
    await productsPage.clickShoppingCart();
    await cartPage.verifyPageLoaded();
  });

  test.describe('Page Elements Verification', () => {
    test('@functional should display all header elements correctly', async () => {
      await cartPage.verifyAllHeaderElements();
    });

    test('@functional should display cart page title correctly', async () => {
      // Verify page title through page loaded verification
      await cartPage.verifyPageLoaded();
    });

    test('@functional should display cart content structure', async () => {
      await cartPage.verifyCartLabelsVisible();
      await cartPage.verifyCompletePageStructure();
    });

    test('@functional should display action buttons', async () => {
      await expect(cartPage.continueShoppingBtn).toBeVisible();
      await expect(cartPage.continueShoppingBtn).toHaveText('Continue Shopping');
      await expect(cartPage.checkoutBtn).toBeVisible();
      await expect(cartPage.checkoutBtn).toHaveText('Checkout');
    });

    test('@functional should display footer elements correctly', async () => {
      await cartPage.verifyFooterElements();
    });

    test('@functional should have correct page URL', async () => {
      expect(cartPage.getCurrentUrl()).toContain('/cart.html');
    });
  });

  test.describe('Empty Cart State', () => {
    test('@functional should display empty cart correctly', async () => {
      // Ensure cart is empty
      await cartPage.clearAllCartItems();
      
      await cartPage.verifyCartIsEmpty();
      await cartPage.verifyCartBadgeNotVisible();
    });

    test('@functional should show cart labels even when empty', async () => {
      // Ensure cart is empty
      await cartPage.clearAllCartItems();
      
      await cartPage.verifyCartLabelsVisible();
    });

    test('@functional should allow navigation when cart is empty', async () => {
      // Ensure cart is empty
      await cartPage.clearAllCartItems();
      
      await cartPage.clickContinueShopping();
      await productsPage.verifyPageLoaded();
    });
  });

  test.describe('Navigation and Menu Functionality', () => {
    test('@functional should open and close hamburger menu', async () => {
      // Verify menu starts closed
      await cartPage.verifyMenuClosed();
      
      // Open menu
      await cartPage.openMenu();
      await cartPage.verifyMenuOpen();
      
      // Close menu
      await cartPage.closeMenu();
      await cartPage.verifyMenuClosed();
    });

    test('@functional should navigate to products page via Continue Shopping', async () => {
      await cartPage.clickContinueShopping();
      await productsPage.verifyPageLoaded();
    });

    test('@functional should navigate to All Items from menu', async () => {
      await cartPage.navigateToAllItems();
      await productsPage.verifyPageLoaded();
    });

    test('@functional should allow logout from menu', async () => {
      await cartPage.logout();
      await loginPage.verifyPageLoaded();
    });

    test('@functional should allow reset app state from menu', async () => {
      // Add items to cart first
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      await cartPage.verifyCartHasItems(1);
      
      // Reset app state and close menu
      await cartPage.resetAppState();
      await cartPage.closeMenu();
      
      // Wait a moment for reset to take effect, then navigate back to cart
      await cartPage.getPage().waitForTimeout(1000);
      await cartPage.clickContinueShopping();
      await productsPage.clickShoppingCart();
      
      // Verify cart is cleared after reset
      await cartPage.verifyCartIsEmpty();
    });
  });

  test.describe('Single Item Cart Operations', () => {
    test.beforeEach(async () => {
      // Ensure clean state - clear cart and add one item
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
    });

    test('@functional should display single item correctly', async () => {
      await cartPage.verifyCartHasItems(1);
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
      await cartPage.verifyItemDetails('Sauce Labs Backpack', '$29.99', '1');
    });

    test('@functional should show correct cart badge for single item', async () => {
      await cartPage.verifyCartBadge('1');
    });

    test('@functional should display item information correctly', async () => {
      const itemName = await cartPage.getItemName('Sauce Labs Backpack');
      const itemPrice = await cartPage.getItemPrice('Sauce Labs Backpack');
      const itemQuantity = await cartPage.getItemQuantity('Sauce Labs Backpack');
      const itemDescription = await cartPage.getItemDescription('Sauce Labs Backpack');
      
      expect(itemName).toBe('Sauce Labs Backpack');
      expect(itemPrice).toBe('$29.99');
      expect(itemQuantity).toBe('1');
      expect(itemDescription).toContain('carry.allTheThings()');
    });

    test('@functional should allow item removal', async () => {
      await cartPage.removeItemFromCart('Sauce Labs Backpack');
      await cartPage.verifyCartIsEmpty();
      await cartPage.verifySpecificItemNotInCart('Sauce Labs Backpack');
    });

    test('@functional should navigate to item details via title click', async () => {
      await cartPage.clickItemTitle('Sauce Labs Backpack');
      expect(cartPage.getCurrentUrl()).toContain('/inventory-item.html');
    });
  });

  test.describe('Multiple Items Cart Operations', () => {
    test.beforeEach(async () => {
      // Clear cart and add multiple items
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.addBikeLightToCart();
      await productsPage.addBoltTShirtToCart();
      await productsPage.clickShoppingCart();
    });

    test('@functional should display multiple items correctly', async () => {
      await cartPage.verifyCartHasItems(3);
      await cartPage.verifyCartBadge('3');
      
      // Verify each item is present
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
      await cartPage.verifySpecificItemInCart('Sauce Labs Bike Light');
      await cartPage.verifySpecificItemInCart('Sauce Labs Bolt T-Shirt');
    });

    test('@functional should maintain correct item details for all items', async () => {
      await cartPage.verifyItemDetails('Sauce Labs Backpack', '$29.99');
      await cartPage.verifyItemDetails('Sauce Labs Bike Light', '$9.99');
      await cartPage.verifyItemDetails('Sauce Labs Bolt T-Shirt', '$15.99');
    });

    test('@functional should calculate total price correctly', async () => {
      const totalPrice = await cartPage.calculateTotalPrice();
      expect(totalPrice).toBe(55.97); // Actual total from cart calculation
    });

    test('@functional should allow selective item removal', async () => {
      // Remove bike light only
      await cartPage.removeItemFromCart('Sauce Labs Bike Light');
      
      await cartPage.verifyCartHasItems(2);
      await cartPage.verifySpecificItemNotInCart('Sauce Labs Bike Light');
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
      await cartPage.verifySpecificItemInCart('Sauce Labs Bolt T-Shirt');
    });

    test('@functional should maintain cart order', async () => {
      const expectedOrder = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
      await cartPage.verifyCartItemOrder(expectedOrder);
    });

    test('@functional should allow clearing all items', async () => {
      await cartPage.clearAllCartItems();
      await cartPage.verifyCartIsEmpty();
    });
  });

  test.describe('Cart State Persistence', () => {
    test('@functional should maintain cart state across page navigation', async () => {
      // Add items
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.addBikeLightToCart();
      
      // Navigate away and back
      await productsPage.clickShoppingCart();
      await cartPage.clickContinueShopping();
      await productsPage.clickShoppingCart();
      
      // Verify items are still there
      await cartPage.verifyCartHasItems(2);
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
      await cartPage.verifySpecificItemInCart('Sauce Labs Bike Light');
    });

    test('@functional should maintain cart state after menu operations', async () => {
      // Add items
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      
      // Navigate to cart and perform menu operations
      await productsPage.clickShoppingCart();
      await cartPage.openMenu();
      await cartPage.closeMenu();
      
      // Verify cart state maintained
      await cartPage.verifyCartHasItems(1);
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
    });
  });

  test.describe('Checkout Process', () => {
    test('@functional should allow checkout with items in cart', async () => {
      // Add item to cart
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      
      // Proceed to checkout
      await cartPage.clickCheckout();
      expect(cartPage.getCurrentUrl()).toContain('/checkout-step-one.html');
    });

    test('@functional should allow checkout with multiple items', async () => {
      // Add multiple items
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.addBikeLightToCart();
      await productsPage.clickShoppingCart();
      
      await cartPage.verifyCartHasItems(2);
      await cartPage.clickCheckout();
      expect(cartPage.getCurrentUrl()).toContain('/checkout-step-one.html');
    });

    test('@functional should allow checkout even with empty cart', async () => {
      // Empty cart and try checkout
      await cartPage.clearAllCartItems();
      await cartPage.clickCheckout();
      expect(cartPage.getCurrentUrl()).toContain('/checkout-step-one.html');
    });
  });

  test.describe('Footer Functionality', () => {
    test('@functional should have functional social media links', async () => {
      await cartPage.verifySocialMediaLinks();
    });

    test('@functional should display correct footer copyright', async () => {
      const footerText = await cartPage.footerCopyright.textContent();
      expect(footerText).toContain('© 2025 Sauce Labs. All Rights Reserved.');
      expect(footerText).toContain('Terms of Service');
      expect(footerText).toContain('Privacy Policy');
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('@functional should handle rapid item addition and removal', async () => {
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      
      // Rapidly add and remove items
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      await cartPage.removeItemFromCart('Sauce Labs Backpack');
      await cartPage.clickContinueShopping();
      await productsPage.addBikeLightToCart();
      await productsPage.clickShoppingCart();
      
      await cartPage.verifyCartHasItems(1);
      await cartPage.verifySpecificItemInCart('Sauce Labs Bike Light');
    });

    test('@functional should handle all possible products in cart', async () => {
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      
      // Add all 6 products
      await productsPage.addBackpackToCart();
      await productsPage.addBikeLightToCart();
      await productsPage.addBoltTShirtToCart();
      await productsPage.addFleeceJacketToCart();
      await productsPage.addOnesieToCart();
      await productsPage.addRedTShirtToCart();
      
      await productsPage.clickShoppingCart();
      await cartPage.verifyCartHasItems(6);
      
      // Verify total price calculation
      const totalPrice = await cartPage.calculateTotalPrice();
      expect(totalPrice).toBe(129.94); // Actual total from cart calculation for all 6 products
    });

    test('@functional should maintain functionality after cart operations', async () => {
      // Perform various operations and verify functionality
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      
      // Test different operations
      await cartPage.openMenu();
      await cartPage.closeMenu();
      await cartPage.clickContinueShopping();
      await productsPage.clickShoppingCart();
      await cartPage.removeItemFromCart('Sauce Labs Backpack');
      
      // Verify everything still works
      await cartPage.verifyCartIsEmpty();
      await cartPage.verifyCompletePageStructure();
    });
  });

  test.describe('Accessibility and Usability', () => {
    test('@functional should have proper page structure', async () => {
      await cartPage.verifyCompletePageStructure();
    });

    test('@functional should display information clearly', async () => {
      // Add item and verify clear display
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      
      // Verify all information is clearly displayed
      await cartPage.verifyCartLabelsVisible();
      await cartPage.verifyItemDetails('Sauce Labs Backpack', '$29.99', '1');
      
      const description = await cartPage.getItemDescription('Sauce Labs Backpack');
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(10);
    });

    test('@functional should have keyboard navigation support', async () => {
      // Test focus on buttons
      await cartPage.continueShoppingBtn.focus();
      await expect(cartPage.continueShoppingBtn).toBeFocused();
      
      await cartPage.checkoutBtn.focus();
      await expect(cartPage.checkoutBtn).toBeFocused();
    });

    test('@functional should maintain consistent styling', async () => {
      // Verify buttons have correct classes and styling
      await expect(cartPage.continueShoppingBtn).toHaveClass(/btn/);
      await expect(cartPage.checkoutBtn).toHaveClass(/btn/);
      
      // Verify cart structure elements are present
      await cartPage.verifyCompletePageStructure();
    });
  });

  test.describe('Browser Compatibility', () => {
    test('@functional should handle page refresh correctly', async () => {
      // Add items to cart
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      
      // Refresh page
      await cartPage.getPage().reload();
      await cartPage.verifyPageLoaded();
      
      // Verify cart state maintained
      await cartPage.verifyCartHasItems(1);
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
    });

    test('@functional should maintain state across browser back/forward', async () => {
      // Add items to cart
      await cartPage.clearAllCartItems();
      await cartPage.clickContinueShopping();
      await productsPage.addBackpackToCart();
      await productsPage.clickShoppingCart();
      
      // Navigate away
      await cartPage.clickContinueShopping();
      
      // Use browser back
      await cartPage.getPage().goBack();
      await cartPage.verifyPageLoaded();
      
      // Verify cart state maintained
      await cartPage.verifyCartHasItems(1);
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
    });
  });
});
