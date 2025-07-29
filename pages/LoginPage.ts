import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model for SwagLabs
 * Enhanced with comprehensive element coverage based on MCP server analysis
 */
export class LoginPage extends BasePage {
  // Primary form elements
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  
  // Logo and branding elements
  private readonly loginLogo: Locator;
  
  // Error handling elements
  private readonly errorMessage: Locator;
  private readonly errorMessageContainer: Locator;
  private readonly errorCloseButton: Locator;
  
  // Container elements
  private readonly loginContainer: Locator;
  private readonly loginWrapper: Locator;
  private readonly loginBox: Locator;
  
  // Credentials information section
  private readonly loginCredentialsContainer: Locator;
  private readonly loginCredentials: Locator;
  private readonly loginPassword: Locator;
  private readonly acceptedUsernamesHeading: Locator;
  private readonly passwordForAllUsersHeading: Locator;
  
  // Individual username elements
  private readonly standardUserText: Locator;
  private readonly lockedOutUserText: Locator;
  private readonly problemUserText: Locator;
  private readonly performanceGlitchUserText: Locator;
  private readonly errorUserText: Locator;
  private readonly visualUserText: Locator;
  
  // Password information
  private readonly secretSauceText: Locator;
  
  // Form and input validation elements
  private readonly loginForm: Locator;

  constructor(page: Page) {
    super(page, '/');
    
    // Primary form elements with data-test attributes
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    
    // Logo and branding
    this.loginLogo = page.locator('.login_logo');
    
    // Error handling elements
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorMessageContainer = page.locator('.error-message-container');
    this.errorCloseButton = page.locator('.error-message-container button');
    
    // Container elements
    this.loginContainer = page.locator('[data-test="login-container"]');
    this.loginWrapper = page.locator('.login_wrapper');
    this.loginBox = page.locator('.login_container');
    
    // Credentials information section
    this.loginCredentialsContainer = page.locator('[data-test="login-credentials-container"]');
    this.loginCredentials = page.locator('[data-test="login-credentials"]');
    this.loginPassword = page.locator('[data-test="login-password"]');
    this.acceptedUsernamesHeading = page.locator('h4').filter({ hasText: 'Accepted usernames are:' });
    this.passwordForAllUsersHeading = page.locator('h4').filter({ hasText: 'Password for all users:' });
    
    // Individual username text elements
    this.standardUserText = page.locator('.login_credentials').getByText('standard_user');
    this.lockedOutUserText = page.locator('.login_credentials').getByText('locked_out_user');
    this.problemUserText = page.locator('.login_credentials').getByText('problem_user');
    this.performanceGlitchUserText = page.locator('.login_credentials').getByText('performance_glitch_user');
    this.errorUserText = page.locator('.login_credentials').getByText('error_user');
    this.visualUserText = page.locator('.login_credentials').getByText('visual_user');
    
    // Password information
    this.secretSauceText = page.locator('.login_password').getByText('secret_sauce');
    
    // Form element
    this.loginForm = page.locator('form');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      loginLogo: this.loginLogo,
      usernameInput: this.usernameInput,
      passwordInput: this.passwordInput,
      loginButton: this.loginButton,
      loginContainer: this.loginContainer,
      loginCredentials: this.loginCredentials
    };
  }

  /**
   * Verify that the user has landed on the Login page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginCredentials).toBeVisible();
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  /**
   * Verify all page elements are present
   */
  async verifyAllElementsPresent(): Promise<void> {
    // Verify main form elements
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    
    // Verify container elements
    await expect(this.loginContainer).toBeVisible();
    await expect(this.loginWrapper).toBeVisible();
    await expect(this.loginBox).toBeVisible();
    
    // Verify credentials information section
    await expect(this.loginCredentialsContainer).toBeVisible();
    await expect(this.loginCredentials).toBeVisible();
    await expect(this.loginPassword).toBeVisible();
    await expect(this.acceptedUsernamesHeading).toBeVisible();
    await expect(this.passwordForAllUsersHeading).toBeVisible();
    
    // Verify individual username elements are present
    await expect(this.standardUserText).toBeVisible();
    await expect(this.lockedOutUserText).toBeVisible();
    await expect(this.problemUserText).toBeVisible();
    await expect(this.performanceGlitchUserText).toBeVisible();
    await expect(this.errorUserText).toBeVisible();
    await expect(this.visualUserText).toBeVisible();
    
    // Verify password information
    await expect(this.secretSauceText).toBeVisible();
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform complete login action
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Clear username field
   */
  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  /**
   * Clear both username and password fields
   */
  async clearCredentials(): Promise<void> {
    await this.clearUsername();
    await this.clearPassword();
  }

  /**
   * Get username field value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Get username placeholder text
   */
  async getUsernamePlaceholder(): Promise<string | null> {
    return await this.usernameInput.getAttribute('placeholder');
  }

  /**
   * Get password placeholder text
   */
  async getPasswordPlaceholder(): Promise<string | null> {
    return await this.passwordInput.getAttribute('placeholder');
  }

  /**
   * Get login button text/value
   */
  async getLoginButtonText(): Promise<string | null> {
    return await this.loginButton.getAttribute('value');
  }

  /**
   * Get logo text
   */
  async getLogoText(): Promise<string> {
    return await this.loginLogo.textContent() || '';
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Verify error message is displayed
   */
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Close error message if present
   */
  async closeErrorMessage(): Promise<void> {
    if (await this.errorCloseButton.isVisible()) {
      await this.errorCloseButton.click();
    }
  }

  /**
   * Get all accepted usernames from the credentials section
   */
  async getAcceptedUsernames(): Promise<string[]> {
    return await this.loginCredentials.evaluate((element) => {
      const textNodes: string[] = [];
      
      // Get all text nodes from the element
      function getTextNodes(node: any) {
        if (node.nodeType === 3) { // TEXT_NODE = 3
          const text = node.textContent?.trim();
          if (text && text.includes('_user')) {
            textNodes.push(text);
          }
        } else {
          for (let child of node.childNodes) {
            getTextNodes(child);
          }
        }
      }
      
      getTextNodes(element);
      return textNodes;
    });
  }

  /**
   * Get password information text
   */
  async getPasswordInfo(): Promise<string> {
    const fullText = await this.secretSauceText.textContent() || '';
    // Extract just the password value after the colon
    const match = fullText.match(/:\s*(.+)$/);
    return match ? match[1].trim() : fullText;
  }

  /**
   * Verify username field attributes
   */
  async verifyUsernameFieldAttributes(): Promise<void> {
    await expect(this.usernameInput).toHaveAttribute('type', 'text');
    await expect(this.usernameInput).toHaveAttribute('placeholder', 'Username');
    await expect(this.usernameInput).toHaveAttribute('data-test', 'username');
  }

  /**
   * Verify password field attributes
   */
  async verifyPasswordFieldAttributes(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    await expect(this.passwordInput).toHaveAttribute('placeholder', 'Password');
    await expect(this.passwordInput).toHaveAttribute('data-test', 'password');
  }

  /**
   * Verify login button attributes
   */
  async verifyLoginButtonAttributes(): Promise<void> {
    await expect(this.loginButton).toHaveAttribute('type', 'submit');
    await expect(this.loginButton).toHaveAttribute('data-test', 'login-button');
    await expect(this.loginButton).toHaveAttribute('value', 'Login');
  }

  /**
   * Check if username field has error styling
   */
  async hasUsernameError(): Promise<boolean> {
    const className = await this.usernameInput.getAttribute('class') || '';
    return className.includes('input_error');
  }

  /**
   * Check if password field has error styling
   */
  async hasPasswordError(): Promise<boolean> {
    const className = await this.passwordInput.getAttribute('class') || '';
    return className.includes('input_error');
  }

  /**
   * Verify login form is present
   */
  async verifyLoginFormPresent(): Promise<void> {
    await expect(this.loginForm).toBeVisible();
  }

  /**
   * Submit form using Enter key
   */
  async submitWithEnter(): Promise<void> {
    await this.passwordInput.press('Enter');
  }

  /**
   * Focus on username field
   */
  async focusUsername(): Promise<void> {
    await this.usernameInput.focus();
  }

  /**
   * Focus on password field
   */
  async focusPassword(): Promise<void> {
    await this.passwordInput.focus();
  }

  /**
   * Tab from username to password field
   */
  async tabToPassword(): Promise<void> {
    await this.usernameInput.press('Tab');
  }

  /**
   * Tab from password to login button
   */
  async tabToLoginButton(): Promise<void> {
    await this.passwordInput.press('Tab');
  }
}
