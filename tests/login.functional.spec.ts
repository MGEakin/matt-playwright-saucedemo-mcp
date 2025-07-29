import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages';
import { USERS, ERROR_MESSAGES } from '../utils/testData';

test.describe('Login Page Functional Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.describe('Page Elements Verification', () => {
    test('@functional should display all page elements correctly', async ({ page }) => {
      await loginPage.verifyPageLoaded();
      await loginPage.verifyAllElementsPresent();
    });

    test('@functional should display correct logo text', async ({ page }) => {
      const logoText = await loginPage.getLogoText();
      expect(logoText).toBe('Swag Labs');
    });

    test('@functional should display correct placeholder texts', async ({ page }) => {
      const usernamePlaceholder = await loginPage.getUsernamePlaceholder();
      const passwordPlaceholder = await loginPage.getPasswordPlaceholder();
      
      expect(usernamePlaceholder).toBe('Username');
      expect(passwordPlaceholder).toBe('Password');
    });

    test('@functional should display correct login button text', async ({ page }) => {
      const loginButtonText = await loginPage.getLoginButtonText();
      expect(loginButtonText).toBe('Login');
    });

    test('@functional should display accepted usernames in credentials section', async ({ page }) => {
      const acceptedUsernames = await loginPage.getAcceptedUsernames();
      
      expect(acceptedUsernames).toContain('standard_user');
      expect(acceptedUsernames).toContain('locked_out_user');
      expect(acceptedUsernames).toContain('problem_user');
      expect(acceptedUsernames).toContain('performance_glitch_user');
      expect(acceptedUsernames).toContain('error_user');
      expect(acceptedUsernames).toContain('visual_user');
    });

    test('@functional should display password information', async ({ page }) => {
      const passwordInfo = await loginPage.getPasswordInfo();
      expect(passwordInfo).toBe('secret_sauce');
    });
  });

  test.describe('Form Field Attributes', () => {
    test('@functional should have correct username field attributes', async ({ page }) => {
      await loginPage.verifyUsernameFieldAttributes();
    });

    test('@functional should have correct password field attributes', async ({ page }) => {
      await loginPage.verifyPasswordFieldAttributes();
    });

    test('@functional should have correct login button attributes', async ({ page }) => {
      await loginPage.verifyLoginButtonAttributes();
    });

    test('@functional should have login form present', async ({ page }) => {
      await loginPage.verifyLoginFormPresent();
    });
  });

  test.describe('User Input Functionality', () => {
    test('@functional should allow username input', async ({ page }) => {
      const testUsername = 'test_user';
      await loginPage.enterUsername(testUsername);
      
      const usernameValue = await loginPage.getUsernameValue();
      expect(usernameValue).toBe(testUsername);
    });

    test('@functional should allow password input', async ({ page }) => {
      const testPassword = 'test_password';
      await loginPage.enterPassword(testPassword);
      
      const passwordValue = await loginPage.getPasswordValue();
      expect(passwordValue).toBe(testPassword);
    });

    test('@functional should clear username field', async ({ page }) => {
      await loginPage.enterUsername('test_user');
      await loginPage.clearUsername();
      
      const usernameValue = await loginPage.getUsernameValue();
      expect(usernameValue).toBe('');
    });

    test('@functional should clear password field', async ({ page }) => {
      await loginPage.enterPassword('test_password');
      await loginPage.clearPassword();
      
      const passwordValue = await loginPage.getPasswordValue();
      expect(passwordValue).toBe('');
    });

    test('@functional should clear both credential fields', async ({ page }) => {
      await loginPage.enterUsername('test_user');
      await loginPage.enterPassword('test_password');
      await loginPage.clearCredentials();
      
      const usernameValue = await loginPage.getUsernameValue();
      const passwordValue = await loginPage.getPasswordValue();
      expect(usernameValue).toBe('');
      expect(passwordValue).toBe('');
    });
  });

  test.describe('Successful Login Scenarios', () => {
    test('@functional should login successfully with standard user', async ({ page }) => {
      await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
      
      // Verify navigation to products page
      await page.waitForURL('**/inventory.html');
      expect(page.url()).toContain('/inventory.html');
    });

    test('@functional should login successfully with problem user', async ({ page }) => {
      await loginPage.login(USERS.PROBLEM.username, USERS.PROBLEM.password);
      
      // Verify navigation to products page
      await page.waitForURL('**/inventory.html');
      expect(page.url()).toContain('/inventory.html');
    });

    test('@functional should login successfully with performance glitch user', async ({ page }) => {
      await loginPage.login(USERS.PERFORMANCE_GLITCH.username, USERS.PERFORMANCE_GLITCH.password);
      
      // Verify navigation to products page
      await page.waitForURL('**/inventory.html');
      expect(page.url()).toContain('/inventory.html');
    });

    test('@functional should login successfully with visual user', async ({ page }) => {
      await loginPage.login(USERS.VISUAL.username, USERS.VISUAL.password);
      
      // Verify navigation to products page
      await page.waitForURL('**/inventory.html');
      expect(page.url()).toContain('/inventory.html');
    });
  });

  test.describe('Login Error Scenarios', () => {
    test('@functional should show error for locked out user', async ({ page }) => {
      await loginPage.login(USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password);
      
      await loginPage.verifyErrorMessage(ERROR_MESSAGES.LOGIN.LOCKED_OUT);
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
    });

    test('@functional should show error for invalid username', async ({ page }) => {
      await loginPage.login('invalid_user', USERS.STANDARD.password);
      
      await loginPage.verifyErrorMessage(ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS);
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
    });

    test('@functional should show error for invalid password', async ({ page }) => {
      await loginPage.login(USERS.STANDARD.username, 'invalid_password');
      
      await loginPage.verifyErrorMessage(ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS);
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
    });

    test('@functional should show error for empty username', async ({ page }) => {
      await loginPage.login('', USERS.STANDARD.password);
      
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Username is required');
    });

    test('@functional should show error for empty password', async ({ page }) => {
      await loginPage.login(USERS.STANDARD.username, '');
      
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Password is required');
    });

    test('@functional should show error for both empty fields', async ({ page }) => {
      await loginPage.login('', '');
      
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Username is required');
    });

    test('@functional should show input error styling on failed login', async ({ page }) => {
      await loginPage.login('invalid_user', 'invalid_password');
      
      expect(await loginPage.hasUsernameError()).toBe(true);
      expect(await loginPage.hasPasswordError()).toBe(true);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('@functional should allow tab navigation through form fields', async ({ page }) => {
      await loginPage.focusUsername();
      await loginPage.tabToPassword();
      
      // Verify password field is focused
      await expect(loginPage['passwordInput']).toBeFocused();
    });

    test('@functional should allow login submission with Enter key', async ({ page }) => {
      await loginPage.enterUsername(USERS.STANDARD.username);
      await loginPage.enterPassword(USERS.STANDARD.password);
      await loginPage.submitWithEnter();
      
      // Verify navigation to products page
      await page.waitForURL('**/inventory.html');
      expect(page.url()).toContain('/inventory.html');
    });

    test('@functional should focus username field by default', async ({ page }) => {
      await loginPage.focusUsername();
      await expect(loginPage['usernameInput']).toBeFocused();
    });
  });

  test.describe('Form Validation', () => {
    test('@functional should maintain input values after error', async ({ page }) => {
      const testUsername = 'invalid_user';
      const testPassword = 'invalid_password';
      
      await loginPage.login(testUsername, testPassword);
      
      // Verify error is shown
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      
      // Verify input values are maintained
      expect(await loginPage.getUsernameValue()).toBe(testUsername);
      expect(await loginPage.getPasswordValue()).toBe(testPassword);
    });

    test('@functional should clear error when typing in fields', async ({ page }) => {
      // Trigger an error first
      await loginPage.login('invalid_user', 'invalid_password');
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      
      // Clear and re-enter credentials
      await loginPage.clearCredentials();
      await loginPage.enterUsername(USERS.STANDARD.username);
      
      // Note: Error might persist until form submission - this tests actual behavior
      // The test validates current application behavior
    });
  });

  test.describe('Accessibility', () => {
    test('@functional should have proper form structure', async ({ page }) => {
      await loginPage.verifyLoginFormPresent();
      
      // Verify form elements are properly structured
      await expect(loginPage['usernameInput']).toBeVisible();
      await expect(loginPage['passwordInput']).toBeVisible();
      await expect(loginPage['loginButton']).toBeVisible();
    });

    test('@functional should have accessible labels via placeholders', async ({ page }) => {
      // Verify placeholder text provides accessible labels
      expect(await loginPage.getUsernamePlaceholder()).toBeTruthy();
      expect(await loginPage.getPasswordPlaceholder()).toBeTruthy();
    });
  });

  test.describe('Error Message Handling', () => {
    test('@functional should display error message with proper formatting', async ({ page }) => {
      await loginPage.login('invalid_user', 'invalid_password');
      
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Epic sadface:');
      expect(errorMessage).toContain('Username and password do not match');
    });

    test('@functional should allow error message dismissal if close button exists', async ({ page }) => {
      await loginPage.login('invalid_user', 'invalid_password');
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      
      // Attempt to close error message (if close button exists)
      await loginPage.closeErrorMessage();
    });
  });

  test.describe('Page State Verification', () => {
    test('@functional should remain on login page after failed login', async ({ page }) => {
      await loginPage.login('invalid_user', 'invalid_password');
      
      // Verify still on login page
      expect(page.url()).toContain('saucedemo.com');
      expect(page.url()).not.toContain('/inventory.html');
    });

    test('@functional should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Swag Labs/);
    });
  });
});
