/**
 * Test data constants for SwagLabs automation
 */

export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  },
  VISUAL: {
    username: 'visual_user',
    password: 'secret_sauce'
  }
};

export const PRODUCTS = {
  SAUCE_LABS_BACKPACK: 'Sauce Labs Backpack',
  SAUCE_LABS_BIKE_LIGHT: 'Sauce Labs Bike Light',
  SAUCE_LABS_BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
  SAUCE_LABS_FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  SAUCE_LABS_ONESIE: 'Sauce Labs Onesie',
  TEST_ALLTHETHINGS_TSHIRT: 'Test.allTheThings() T-Shirt (Red)'
};

export const CHECKOUT_INFO = {
  VALID: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  INVALID: {
    firstName: '',
    lastName: '',
    postalCode: ''
  }
};

export const ERROR_MESSAGES = {
  LOGIN: {
    LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
    INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
    USERNAME_REQUIRED: 'Epic sadface: Username is required',
    PASSWORD_REQUIRED: 'Epic sadface: Password is required'
  },
  CHECKOUT: {
    FIRST_NAME_REQUIRED: 'Error: First Name is required',
    LAST_NAME_REQUIRED: 'Error: Last Name is required',
    POSTAL_CODE_REQUIRED: 'Error: Postal Code is required'
  }
};

export const URLS = {
  BASE: 'https://www.saucedemo.com',
  LOGIN: '/',
  PRODUCTS: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT: '/checkout-step-one.html',
  CHECKOUT_OVERVIEW: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html'
};
