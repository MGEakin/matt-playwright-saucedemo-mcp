import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Information Page Object Model for SwagLabs
 * Enhanced with comprehensive element coverage based on MCP server analysis
 */
export class CheckoutPage extends BasePage {
  // Header Elements
  private readonly headerContainer: Locator;
  private readonly primaryHeader: Locator;
  private readonly secondaryHeader: Locator;
  private readonly appLogo: Locator;
  
  // Navigation Menu Elements
  private readonly openMenuButton: Locator;
  private readonly closeMenuButton: Locator;
  private readonly inventorySidebarLink: Locator;
  private readonly aboutSidebarLink: Locator;
  private readonly logoutSidebarLink: Locator;
  private readonly resetSidebarLink: Locator;
  
  // Shopping Cart Elements
  private readonly shoppingCartLink: Locator;
  private readonly shoppingCartBadge: Locator;
  
  // Page Title Elements
  private readonly pageTitle: Locator;
  private readonly titleSpan: Locator;
  
  // Form Container Elements
  private readonly checkoutInfoContainer: Locator;
  private readonly checkoutInfo: Locator;
  
  // Form Input Elements
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  
  // Form Input Error Indicators
  private readonly firstNameErrorIcon: Locator;
  private readonly lastNameErrorIcon: Locator;
  private readonly postalCodeErrorIcon: Locator;
  
  // Action Buttons Container
  private readonly checkoutButtonsContainer: Locator;
  private readonly cancelButton: Locator;
  private readonly continueButton: Locator;
  
  // Error Message Elements
  private readonly errorMessage: Locator;
  private readonly errorButton: Locator;
  
  // Footer Elements
  private readonly footer: Locator;
  private readonly socialTwitter: Locator;
  private readonly socialFacebook: Locator;
  private readonly socialLinkedIn: Locator;
  private readonly footerCopy: Locator;

  constructor(page: Page) {
    super(page, '/checkout-step-one.html');
    
    // Header Elements
    this.headerContainer = page.locator('[data-test="header-container"]');
    this.primaryHeader = page.locator('[data-test="primary-header"]');
    this.secondaryHeader = page.locator('[data-test="secondary-header"]');
    this.appLogo = page.locator('.app_logo');
    
    // Navigation Menu Elements
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.inventorySidebarLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutSidebarLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutSidebarLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetSidebarLink = page.locator('[data-test="reset-sidebar-link"]');
    
    // Shopping Cart Elements
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    
    // Page Title Elements
    this.pageTitle = page.locator('.title');
    this.titleSpan = page.locator('[data-test="title"]');
    
    // Form Container Elements
    this.checkoutInfoContainer = page.locator('[data-test="checkout-info-container"]');
    this.checkoutInfo = page.locator('.checkout_info');
    
    // Form Input Elements
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    
    // Form Input Error Indicators
    this.firstNameErrorIcon = page.locator('[data-test="firstName"] + .error_icon');
    this.lastNameErrorIcon = page.locator('[data-test="lastName"] + .error_icon');
    this.postalCodeErrorIcon = page.locator('[data-test="postalCode"] + .error_icon');
    
    // Action Buttons Container
    this.checkoutButtonsContainer = page.locator('.checkout_buttons');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');
    
    // Error Message Elements
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('[data-test="error-button"]');
    
    // Footer Elements
    this.footer = page.locator('[data-test="footer"]');
    this.socialTwitter = page.locator('[data-test="social-twitter"]');
    this.socialFacebook = page.locator('[data-test="social-facebook"]');
    this.socialLinkedIn = page.locator('[data-test="social-linkedin"]');
    this.footerCopy = page.locator('[data-test="footer-copy"]');
  }

  /**
   * Get page identifier elements for verification
   */
  getPageIdentifiers(): Record<string, Locator> {
    return {
      pageTitle: this.pageTitle,
      titleSpan: this.titleSpan,
      firstNameInput: this.firstNameInput,
      lastNameInput: this.lastNameInput,
      postalCodeInput: this.postalCodeInput,
      continueButton: this.continueButton,
      cancelButton: this.cancelButton,
      checkoutInfoContainer: this.checkoutInfoContainer
    };
  }

  /**
   * Verify that the user has landed on the Checkout Information page
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    await expect(this.titleSpan).toBeVisible();
    await expect(this.titleSpan).toHaveText('Checkout: Your Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
    expect(this.getCurrentUrl()).toContain('/checkout-step-one.html');
  }

  // ============ Enhanced Methods Based on MCP Server Analysis ============

  /**
   * Navigation Menu Methods
   */
  async openMenu(): Promise<void> {
    await this.openMenuButton.click();
  }

  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
  }

  async navigateToAllItems(): Promise<void> {
    await this.openMenu();
    await this.inventorySidebarLink.click();
  }

  async navigateToAbout(): Promise<void> {
    await this.openMenu();
    await this.aboutSidebarLink.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutSidebarLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetSidebarLink.click();
  }

  /**
   * Shopping Cart Badge Methods
   */
  async getCartItemCount(): Promise<string | null> {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent();
    }
    return null;
  }

  async verifyCartBadge(expectedCount: string): Promise<void> {
    await expect(this.shoppingCartBadge).toBeVisible();
    await expect(this.shoppingCartBadge).toHaveText(expectedCount);
  }

  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Form Input Methods - Enhanced
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
  }

  async enterPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeInput.clear();
    await this.postalCodeInput.fill(postalCode);
  }

  async getFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  async getLastNameValue(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  async getPostalCodeValue(): Promise<string> {
    return await this.postalCodeInput.inputValue();
  }

  async clearFirstName(): Promise<void> {
    await this.firstNameInput.clear();
  }

  async clearLastName(): Promise<void> {
    await this.lastNameInput.clear();
  }

  async clearPostalCode(): Promise<void> {
    await this.postalCodeInput.clear();
  }

  async clearAllFields(): Promise<void> {
    await this.clearFirstName();
    await this.clearLastName();
    await this.clearPostalCode();
  }

  /**
   * Form Validation Methods
   */
  async verifyFirstNameErrorIcon(): Promise<void> {
    await expect(this.firstNameErrorIcon).toBeVisible();
  }

  async verifyLastNameErrorIcon(): Promise<void> {
    await expect(this.lastNameErrorIcon).toBeVisible();
  }

  async verifyPostalCodeErrorIcon(): Promise<void> {
    await expect(this.postalCodeErrorIcon).toBeVisible();
  }

  async verifyNoErrorIcons(): Promise<void> {
    await expect(this.firstNameErrorIcon).not.toBeVisible();
    await expect(this.lastNameErrorIcon).not.toBeVisible();
    await expect(this.postalCodeErrorIcon).not.toBeVisible();
  }

  /**
   * Form Field Validation States
   */
  async verifyFirstNameFieldFocused(): Promise<void> {
    await expect(this.firstNameInput).toBeFocused();
  }

  async verifyLastNameFieldFocused(): Promise<void> {
    await expect(this.lastNameInput).toBeFocused();
  }

  async verifyPostalCodeFieldFocused(): Promise<void> {
    await expect(this.postalCodeInput).toBeFocused();
  }

  async focusFirstNameField(): Promise<void> {
    await this.firstNameInput.focus();
  }

  async focusLastNameField(): Promise<void> {
    await this.lastNameInput.focus();
  }

  async focusPostalCodeField(): Promise<void> {
    await this.postalCodeInput.focus();
  }

  /**
   * Fill all checkout information
   */
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  /**
   * Verify all form fields are filled correctly
   */
  async verifyFormFieldsPopulated(firstName: string, lastName: string, postalCode: string): Promise<void> {
    expect(await this.getFirstNameValue()).toBe(firstName);
    expect(await this.getLastNameValue()).toBe(lastName);
    expect(await this.getPostalCodeValue()).toBe(postalCode);
  }

  /**
   * Action Button Methods
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async verifyContinueButtonEnabled(): Promise<void> {
    await expect(this.continueButton).toBeEnabled();
  }

  async verifyCancelButtonEnabled(): Promise<void> {
    await expect(this.cancelButton).toBeEnabled();
  }

  /**
   * Error Message Methods - Enhanced
   */
  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return await this.errorMessage.textContent() || '';
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async verifyNoErrorMessage(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible();
  }

  async closeErrorMessage(): Promise<void> {
    if (await this.errorButton.isVisible()) {
      await this.errorButton.click();
    }
  }

  async verifyErrorMessageClosed(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible();
  }

  /**
   * Specific Error Message Validation
   */
  async verifyFirstNameRequiredError(): Promise<void> {
    await this.verifyErrorMessage('Error: First Name is required');
  }

  async verifyLastNameRequiredError(): Promise<void> {
    await this.verifyErrorMessage('Error: Last Name is required');
  }

  async verifyPostalCodeRequiredError(): Promise<void> {
    await this.verifyErrorMessage('Error: Postal Code is required');
  }

  /**
   * Header and Footer Verification Methods
   */
  async verifyAllHeaderElements(): Promise<void> {
    await expect(this.headerContainer).toBeVisible();
    await expect(this.primaryHeader).toBeVisible();
    await expect(this.secondaryHeader).toBeVisible();
    await expect(this.openMenuButton).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async verifyFooterElements(): Promise<void> {
    await expect(this.footer).toBeVisible();
    await expect(this.socialTwitter).toBeVisible();
    await expect(this.socialFacebook).toBeVisible();
    await expect(this.socialLinkedIn).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
  }

  /**
   * Menu state verification methods
   */
  async verifyMenuClosed(): Promise<void> {
    await expect(this.inventorySidebarLink).not.toBeVisible();
    await expect(this.aboutSidebarLink).not.toBeVisible();
    await expect(this.logoutSidebarLink).not.toBeVisible();
    await expect(this.resetSidebarLink).not.toBeVisible();
    await expect(this.closeMenuButton).not.toBeVisible();
  }

  async verifyMenuOpen(): Promise<void> {
    await expect(this.inventorySidebarLink).toBeVisible();
    await expect(this.aboutSidebarLink).toBeVisible();
    await expect(this.logoutSidebarLink).toBeVisible();
    await expect(this.resetSidebarLink).toBeVisible();
    await expect(this.closeMenuButton).toBeVisible();
  }

  /**
   * Social media link verification
   */
  async verifySocialMediaLinks(): Promise<void> {
    await expect(this.socialTwitter).toHaveAttribute('href', 'https://twitter.com/saucelabs');
    await expect(this.socialFacebook).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
    await expect(this.socialLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
  }

  /**
   * Complete page verification method
   */
  async verifyCompletePageStructure(): Promise<void> {
    await this.verifyAllHeaderElements();
    await this.verifyFooterElements();
    await this.verifyMenuClosed();
    
    // Verify form structure
    await expect(this.checkoutInfoContainer).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    
    // Verify action buttons
    await expect(this.continueButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

  /**
   * Form Workflow Methods
   */
  async completeCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.clickContinue();
  }

  async submitEmptyForm(): Promise<void> {
    await this.clearAllFields();
    await this.clickContinue();
  }

  async submitPartialForm(firstName?: string, lastName?: string, postalCode?: string): Promise<void> {
    await this.clearAllFields();
    if (firstName) await this.enterFirstName(firstName);
    if (lastName) await this.enterLastName(lastName);
    if (postalCode) await this.enterPostalCode(postalCode);
    await this.clickContinue();
  }

  /**
   * Test helper methods for validation scenarios
   */
  async testFirstNameValidation(): Promise<void> {
    await this.submitPartialForm(); // Submit with no fields filled
    await this.verifyFirstNameRequiredError();
    await this.verifyFirstNameErrorIcon();
  }

  async testLastNameValidation(): Promise<void> {
    await this.submitPartialForm('John'); // Submit with only first name
    await this.verifyLastNameRequiredError();
    await this.verifyLastNameErrorIcon();
  }

  async testPostalCodeValidation(): Promise<void> {
    await this.submitPartialForm('John', 'Doe'); // Submit with first and last name only
    await this.verifyPostalCodeRequiredError();
    await this.verifyPostalCodeErrorIcon();
  }

  // ============ Public Getters for Testing ============
  
  get continueBtn(): Locator {
    return this.continueButton;
  }

  get cancelBtn(): Locator {
    return this.cancelButton;
  }

  get cartBadge(): Locator {
    return this.shoppingCartBadge;
  }

  get footerCopyright(): Locator {
    return this.footerCopy;
  }

  get errorMessageElement(): Locator {
    return this.errorMessage;
  }

  get firstNameField(): Locator {
    return this.firstNameInput;
  }

  get lastNameField(): Locator {
    return this.lastNameInput;
  }

  get postalCodeField(): Locator {
    return this.postalCodeInput;
  }

  /**
   * Get page instance for advanced operations
   */
  getPage(): Page {
    return this.page;
  }
}
