# prompt_01

## Project Overview

This is a comprehensive Playwright test automation framework for SwagLabs (saucedemo.com), an e-commerce testing site. The framework is built by Matthew Eakin, an ISTBQ certified Software Development Engineer in Test (SDET), and incorporates Playwright MCP server capabilities for enhanced test development and debugging.

## Test Scope

The framework covers testing of the complete SwagLabs e-commerce user journey through the following pages accessed sequentially:

1. **Login** - User authentication page
2. **Products** - Product catalog/inventory page  
3. **Product Details** - Individual product information page
4. **Shopping Cart** - Cart management page
5. **Checkout** - Customer information input page
6. **Checkout: Your Information** - Billing/shipping details page
7. **Checkout: Overview** - Order summary and review page
8. **Finish** - Order completion confirmation page

## Framework Architecture

### Page Object Model (POM)
The framework implements a robust Page Object Model pattern with:

- **BasePage**: Abstract base class containing common functionality for all page objects
- **Individual Page Classes**: Dedicated page objects for each SwagLabs page
- **Page Verification Methods**: Each page object includes a `verifyPageLoaded()` method to confirm successful page navigation

### Key Components

#### 1. Page Objects (`/pages`)
- `BasePage.ts` - Abstract base class with common page functionality
- `LoginPage.ts` - Login page interactions and verifications
- `ProductsPage.ts` - Product catalog management 
- `ProductDetailsPage.ts` - Individual product page operations
- `ShoppingCartPage.ts` - Shopping cart functionality
- `CheckoutPage.ts` - Checkout information form handling
- `CheckoutOverviewPage.ts` - Order summary and review operations
- `CheckoutCompletePage.ts` - Order completion verification
- `index.ts` - Centralized page object exports

#### 2. Test Utilities (`/utils`)
- `testData.ts` - Test data constants including user credentials, product names, and error messages
- `testHelper.ts` - Common test flows and helper methods for complex user journeys

#### 3. Test Suites (`/tests`)
- `smoke.spec.ts` - Smoke tests verifying successful navigation to each page with `@smoke` tag

#### 4. Configuration
- `playwright.config.ts` - Playwright configuration with multiple browser support
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## Features

### Playwright MCP Server Integration
The framework is designed to work with Playwright MCP server for:
- Real-time page analysis and element inspection
- Interactive test development and debugging
- Page structure documentation and validation
- Reduced test flakiness through actual page interaction verification

### Multi-Browser Support
Configured to run tests across:
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox) 
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- Microsoft Edge
- Google Chrome

### Test Data Management
Comprehensive test data including:
- Multiple user types (standard, locked out, problem, performance glitch, visual)
- Product catalog with all available SwagLabs products
- Checkout information templates
- Error message constants for validation

### Advanced Reporting
- HTML reports for test results
- Screenshot capture on test failures
- Video recording for failed tests
- Trace collection for debugging

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
```bash
npm install
npx playwright install
```

### Running Tests

#### All Tests
```bash
npm test
```

#### Smoke Tests Only
```bash
npm run test:smoke
```

#### Headed Mode (Visual Testing)
```bash
npm run test:headed
```

#### Debug Mode
```bash
npm run test:debug
```

#### Interactive UI Mode
```bash
npm run test:ui
```

#### View Test Reports
```bash
npm run report
```

## Test Development Guidelines

### Following ISTQB Best Practices
- Each test verifies only one specific behavior
- Tests are isolated and independent
- Clear test naming and documentation
- Comprehensive assertions with meaningful error messages
- Proper wait strategies to avoid flaky tests

### Playwright Best Practices
- Use of data-test attributes for reliable element selection
- Proper wait strategies (`waitForLoadState`, `waitForSelector`)
- Page object encapsulation of UI interactions
- Realistic user behavior simulation
- Network idle waiting for complete page loads

### MCP Server Usage
When using the Playwright MCP server:
- Analyze page elements before writing tests
- Document page structure and behavior
- Verify tests against actual page implementation
- Use controlled test environment for consistency
- Access page snapshots before interactions

## Framework Benefits

1. **Maintainability**: Page Object Model provides clear separation of concerns
2. **Scalability**: Modular architecture supports easy addition of new tests and pages
3. **Reliability**: Robust wait strategies and verification methods reduce test flakiness
4. **Debugging**: Comprehensive reporting and MCP server integration aid in troubleshooting
5. **Standards Compliance**: Follows ISTQB testing principles and Playwright best practices

## Author

**Matthew Eakin**  
ISTQB Certified Software Development Engineer in Test (SDET)

This framework demonstrates professional test automation practices suitable for enterprise-level e-commerce application testing.
