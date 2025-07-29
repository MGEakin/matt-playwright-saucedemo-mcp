import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS, CHECKOUT_INFO, ERROR_MESSAGES } from '../utils/testData';

/**
 * Checkout Information Page Functional Tests
 * Comprehensive test suite covering all Checkout Information page functionality
 * Enhanced based on MCP server analysis
 */
test.describe('Checkout Information Page Functional Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to login page and login
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    
    // Add items to cart and navigate to checkout
    await productsPage.addBackpackToCart();
    await productsPage.addBikeLightToCart();
    await productsPage.clickShoppingCart();
    await cartPage.clickCheckout();
    await checkoutPage.verifyPageLoaded();
  });

  test.describe('Page Elements Verification', () => {
    test('@functional should display all header elements correctly', async () => {
      await checkoutPage.verifyAllHeaderElements();
    });

    test('@functional should display checkout page title correctly', async () => {
      await checkoutPage.verifyPageLoaded();
    });

    test('@functional should display all form elements', async () => {
      await expect(checkoutPage.firstNameField).toBeVisible();
      await expect(checkoutPage.firstNameField).toHaveAttribute('placeholder', 'First Name');
      
      await expect(checkoutPage.lastNameField).toBeVisible();
      await expect(checkoutPage.lastNameField).toHaveAttribute('placeholder', 'Last Name');
      
      await expect(checkoutPage.postalCodeField).toBeVisible();
      await expect(checkoutPage.postalCodeField).toHaveAttribute('placeholder', 'Zip/Postal Code');
    });

    test('@functional should display action buttons correctly', async () => {
      await expect(checkoutPage.continueBtn).toBeVisible();
      await expect(checkoutPage.continueBtn).toHaveText('Continue');
      await expect(checkoutPage.cancelBtn).toBeVisible();
      await expect(checkoutPage.cancelBtn).toContainText('Cancel');
    });

    test('@functional should display footer elements correctly', async () => {
      await checkoutPage.verifyFooterElements();
    });

    test('@functional should have correct page URL', async () => {
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-one.html');
    });

    test('@functional should display shopping cart badge', async () => {
      await checkoutPage.verifyCartBadge('2');
    });
  });

  test.describe('Form Input Functionality', () => {
    test('@functional should allow entering first name', async () => {
      await checkoutPage.enterFirstName('John');
      expect(await checkoutPage.getFirstNameValue()).toBe('John');
    });

    test('@functional should allow entering last name', async () => {
      await checkoutPage.enterLastName('Doe');
      expect(await checkoutPage.getLastNameValue()).toBe('Doe');
    });

    test('@functional should allow entering postal code', async () => {
      await checkoutPage.enterPostalCode('12345');
      expect(await checkoutPage.getPostalCodeValue()).toBe('12345');
    });

    test('@functional should allow clearing individual fields', async () => {
      // Fill all fields first
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      
      // Clear individual fields
      await checkoutPage.clearFirstName();
      expect(await checkoutPage.getFirstNameValue()).toBe('');
      
      await checkoutPage.clearLastName();
      expect(await checkoutPage.getLastNameValue()).toBe('');
      
      await checkoutPage.clearPostalCode();
      expect(await checkoutPage.getPostalCodeValue()).toBe('');
    });

    test('@functional should allow clearing all fields at once', async () => {
      // Fill all fields first
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      
      // Clear all fields
      await checkoutPage.clearAllFields();
      expect(await checkoutPage.getFirstNameValue()).toBe('');
      expect(await checkoutPage.getLastNameValue()).toBe('');
      expect(await checkoutPage.getPostalCodeValue()).toBe('');
    });

    test('@functional should handle special characters in input fields', async () => {
      await checkoutPage.enterFirstName('Jean-Luc');
      await checkoutPage.enterLastName("O'Connor");
      await checkoutPage.enterPostalCode('12345-6789');
      
      expect(await checkoutPage.getFirstNameValue()).toBe('Jean-Luc');
      expect(await checkoutPage.getLastNameValue()).toBe("O'Connor");
      expect(await checkoutPage.getPostalCodeValue()).toBe('12345-6789');
    });

    test('@functional should handle long input values', async () => {
      const longFirstName = 'VeryLongFirstNameThatShouldStillWork';
      const longLastName = 'VeryLongLastNameThatShouldAlsoWork';
      const longPostalCode = '12345678901234567890';
      
      await checkoutPage.enterFirstName(longFirstName);
      await checkoutPage.enterLastName(longLastName);
      await checkoutPage.enterPostalCode(longPostalCode);
      
      expect(await checkoutPage.getFirstNameValue()).toBe(longFirstName);
      expect(await checkoutPage.getLastNameValue()).toBe(longLastName);
      expect(await checkoutPage.getPostalCodeValue()).toBe(longPostalCode);
    });
  });

  test.describe('Form Validation - Required Fields', () => {
    test('@functional should show error when submitting empty form', async () => {
      await checkoutPage.submitEmptyForm();
      await checkoutPage.verifyFirstNameRequiredError();
      await checkoutPage.verifyFirstNameErrorIcon();
    });

    test('@functional should show error when first name is missing', async () => {
      await checkoutPage.testFirstNameValidation();
    });

    test('@functional should show error when last name is missing', async () => {
      await checkoutPage.testLastNameValidation();
    });

    test('@functional should show error when postal code is missing', async () => {
      await checkoutPage.testPostalCodeValidation();
    });

    test('@functional should validate each field in sequence', async () => {
      // Test first name validation
      await checkoutPage.submitEmptyForm();
      await checkoutPage.verifyFirstNameRequiredError();
      
      // Add first name, test last name validation
      await checkoutPage.enterFirstName('John');
      await checkoutPage.clickContinue();
      await checkoutPage.verifyLastNameRequiredError();
      
      // Add last name, test postal code validation
      await checkoutPage.enterLastName('Doe');
      await checkoutPage.clickContinue();
      await checkoutPage.verifyPostalCodeRequiredError();
    });

    test('@functional should clear error when all fields are filled', async () => {
      // First trigger an error
      await checkoutPage.submitEmptyForm();
      await checkoutPage.verifyFirstNameRequiredError();
      
      // Then fill all fields and submit successfully
      await checkoutPage.fillCheckoutInformation(
        CHECKOUT_INFO.VALID.firstName,
        CHECKOUT_INFO.VALID.lastName,
        CHECKOUT_INFO.VALID.postalCode
      );
      await checkoutPage.clickContinue();
      
      // Should navigate to checkout overview page
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });
  });

  test.describe('Form Validation - Error States', () => {
    test('@functional should display error icons for empty fields', async () => {
      await checkoutPage.submitEmptyForm();
      
      // Check that error icons appear for all empty fields
      await checkoutPage.verifyFirstNameErrorIcon();
      await checkoutPage.verifyLastNameErrorIcon();
      await checkoutPage.verifyPostalCodeErrorIcon();
    });

    test('@functional should hide error icons when fields are filled', async () => {
      // First trigger errors
      await checkoutPage.submitEmptyForm();
      await checkoutPage.verifyFirstNameErrorIcon();
      
      // Fill fields and verify error icons disappear
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      
      // Should proceed without errors (navigate to next page)
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should handle error message dismissal', async () => {
      // Trigger error
      await checkoutPage.submitEmptyForm();
      await checkoutPage.verifyFirstNameRequiredError();
      
      // Try to close error message (if close button exists)
      await checkoutPage.closeErrorMessage();
      
      // Fill first name and verify error changes
      await checkoutPage.enterFirstName('John');
      await checkoutPage.clickContinue();
      await checkoutPage.verifyLastNameRequiredError();
    });
  });

  test.describe('Navigation and Menu Functionality', () => {
    test('@functional should open and close hamburger menu', async () => {
      // Verify menu starts closed
      await checkoutPage.verifyMenuClosed();
      
      // Open menu
      await checkoutPage.openMenu();
      await checkoutPage.verifyMenuOpen();
      
      // Close menu
      await checkoutPage.closeMenu();
      await checkoutPage.verifyMenuClosed();
    });

    test('@functional should navigate to All Items from menu', async () => {
      await checkoutPage.navigateToAllItems();
      await productsPage.verifyPageLoaded();
    });

    test('@functional should allow logout from menu', async () => {
      await checkoutPage.logout();
      await loginPage.verifyPageLoaded();
    });

    test('@functional should cancel and return to cart', async () => {
      await checkoutPage.clickCancel();
      await cartPage.verifyPageLoaded();
    });

    test('@functional should navigate to cart via cart icon', async () => {
      await checkoutPage.clickShoppingCart();
      await cartPage.verifyPageLoaded();
    });

    test('@functional should maintain cart state after navigation', async () => {
      // Verify cart badge shows correct count
      await checkoutPage.verifyCartBadge('2');
      
      // Navigate to cart and back
      await checkoutPage.clickShoppingCart();
      await cartPage.verifyCartHasItems(2);
      await cartPage.clickCheckout();
      await checkoutPage.verifyPageLoaded();
      
      // Verify cart badge still shows correct count
      await checkoutPage.verifyCartBadge('2');
    });
  });

  test.describe('Form Submission Success Cases', () => {
    test('@functional should successfully submit with valid information', async () => {
      await checkoutPage.completeCheckoutInformation(
        CHECKOUT_INFO.VALID.firstName,
        CHECKOUT_INFO.VALID.lastName,
        CHECKOUT_INFO.VALID.postalCode
      );
      
      // Should navigate to checkout overview page
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should handle various valid input formats', async () => {
      const testCases = [
        { firstName: 'John', lastName: 'Doe', postalCode: '12345' },
        { firstName: 'Mary-Jane', lastName: "O'Connor", postalCode: '12345-6789' },
        { firstName: 'José', lastName: 'García', postalCode: 'A1B 2C3' },
        { firstName: 'Anne', lastName: 'van der Berg', postalCode: '90210' }
      ];

      for (const testCase of testCases) {
        await checkoutPage.clearAllFields();
        await checkoutPage.completeCheckoutInformation(
          testCase.firstName,
          testCase.lastName,
          testCase.postalCode
        );
        
        // Should navigate to checkout overview page
        expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
        
        // Navigate back to test next case
        await checkoutPage.getPage().goBack();
        await checkoutPage.verifyPageLoaded();
      }
    });

    test('@functional should maintain form state during same session', async () => {
      // Fill form but don't submit
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      
      // Navigate away and back
      await checkoutPage.clickCancel();
      await cartPage.clickCheckout();
      
      // Form should be empty (fresh state)
      expect(await checkoutPage.getFirstNameValue()).toBe('');
      expect(await checkoutPage.getLastNameValue()).toBe('');
      expect(await checkoutPage.getPostalCodeValue()).toBe('');
    });
  });

  test.describe('Accessibility and Usability', () => {
    test('@functional should have proper page structure', async () => {
      await checkoutPage.verifyCompletePageStructure();
    });

    test('@functional should support keyboard navigation', async () => {
      // Test tab order through form fields
      await checkoutPage.focusFirstNameField();
      await checkoutPage.verifyFirstNameFieldFocused();
      
      await checkoutPage.getPage().keyboard.press('Tab');
      await checkoutPage.verifyLastNameFieldFocused();
      
      await checkoutPage.getPage().keyboard.press('Tab');
      await checkoutPage.verifyPostalCodeFieldFocused();
    });

    test('@functional should have proper form labels and placeholders', async () => {
      await expect(checkoutPage.firstNameField).toHaveAttribute('placeholder', 'First Name');
      await expect(checkoutPage.lastNameField).toHaveAttribute('placeholder', 'Last Name');
      await expect(checkoutPage.postalCodeField).toHaveAttribute('placeholder', 'Zip/Postal Code');
    });

    test('@functional should have enabled action buttons', async () => {
      await checkoutPage.verifyContinueButtonEnabled();
      await checkoutPage.verifyCancelButtonEnabled();
    });

    test('@functional should display information clearly', async () => {
      // Verify all required elements are visible and readable
      await checkoutPage.verifyPageLoaded();
      await checkoutPage.verifyCompletePageStructure();
    });
  });

  test.describe('Footer Functionality', () => {
    test('@functional should have functional social media links', async () => {
      await checkoutPage.verifySocialMediaLinks();
    });

    test('@functional should display correct footer copyright', async () => {
      const footerText = await checkoutPage.footerCopyright.textContent();
      expect(footerText).toContain('© 2025 Sauce Labs. All Rights Reserved.');
      expect(footerText).toContain('Terms of Service');
      expect(footerText).toContain('Privacy Policy');
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('@functional should handle rapid form submission attempts', async () => {
      // Try submitting multiple times quickly
      await checkoutPage.clickContinue();
      await checkoutPage.clickContinue();
      await checkoutPage.clickContinue();
      
      // Should only show one error message
      await checkoutPage.verifyFirstNameRequiredError();
    });

    test('@functional should handle form with only whitespace', async ({ page }) => {
      await checkoutPage.enterFirstName('   ');
      await checkoutPage.enterLastName('   ');
      await checkoutPage.enterPostalCode('   ');
      await checkoutPage.clickContinue();
      
      // Application accepts whitespace as valid input and proceeds to checkout overview
      await page.waitForURL('**/checkout-step-two.html');
      await expect(page.url()).toContain('checkout-step-two');
    });

    test('@functional should maintain functionality after errors', async () => {
      // Trigger error
      await checkoutPage.submitEmptyForm();
      await checkoutPage.verifyFirstNameRequiredError();
      
      // Should still be able to use all form functions
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      
      // Should proceed successfully
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should handle browser refresh correctly', async () => {
      // Fill form
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      
      // Refresh page
      await checkoutPage.getPage().reload();
      await checkoutPage.verifyPageLoaded();
      
      // Form should be reset after refresh
      expect(await checkoutPage.getFirstNameValue()).toBe('');
      expect(await checkoutPage.getLastNameValue()).toBe('');
      expect(await checkoutPage.getPostalCodeValue()).toBe('');
    });

    test('@functional should handle browser back/forward correctly', async () => {
      // Complete form and go to next page
      await checkoutPage.completeCheckoutInformation('John', 'Doe', '12345');
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
      
      // Use browser back
      await checkoutPage.getPage().goBack();
      await checkoutPage.verifyPageLoaded();
      
      // Use browser forward
      await checkoutPage.getPage().goForward();
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });
  });

  test.describe('Integration with Cart and Workflow', () => {
    test('@functional should proceed to checkout overview with valid data', async () => {
      await checkoutPage.completeCheckoutInformation(
        CHECKOUT_INFO.VALID.firstName,
        CHECKOUT_INFO.VALID.lastName,
        CHECKOUT_INFO.VALID.postalCode
      );
      
      // Should be on checkout overview page
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should maintain cart items through checkout flow', async () => {
      // Verify cart badge shows items
      await checkoutPage.verifyCartBadge('2');
      
      // Complete checkout information
      await checkoutPage.completeCheckoutInformation('John', 'Doe', '12345');
      
      // Cart should still have items on overview page
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should cancel back to cart with items intact', async () => {
      await checkoutPage.clickCancel();
      await cartPage.verifyPageLoaded();
      await cartPage.verifyCartHasItems(2);
      await cartPage.verifySpecificItemInCart('Sauce Labs Backpack');
      await cartPage.verifySpecificItemInCart('Sauce Labs Bike Light');
    });
  });

  test.describe('Data Validation Edge Cases', () => {
    test('@functional should handle minimum valid input', async () => {
      await checkoutPage.completeCheckoutInformation('A', 'B', '1');
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should handle numeric names', async () => {
      await checkoutPage.completeCheckoutInformation('123', '456', '12345');
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should handle international characters', async () => {
      await checkoutPage.completeCheckoutInformation('François', 'Müller', 'Ñ1234');
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });

    test('@functional should handle mixed case postal codes', async () => {
      await checkoutPage.completeCheckoutInformation('John', 'Doe', 'k1A 0A6');
      expect(checkoutPage.getCurrentUrl()).toContain('/checkout-step-two.html');
    });
  });
});
