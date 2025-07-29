# SwagLabs Playwright Test Automation Framework with MCP Integration

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

A comprehensive Playwright test automation framework for [SwagLabs](https://www.saucedemo.com), featuring Playwright MCP (Model Context Protocol) server integration for enhanced test development and debugging capabilities.

## 🎯 Project Overview

This framework provides end-to-end testing for the SwagLabs e-commerce application, covering the complete user journey from login to order completion. Built by Matthew Eakin, ISTQB certified Software Development Engineer in Test (SDET), following industry best practices and professional testing standards.

## 🏗️ Architecture

### Page Object Model (POM)
- **BasePage**: Abstract base class with common functionality
- **Dedicated Page Objects**: Individual classes for each application page
- **Verification Methods**: Built-in page loading verification for each page

### Test Coverage
The framework covers all critical SwagLabs pages:
1. **Login** - User authentication
2. **Products** - Product catalog browsing
3. **Product Details** - Individual product information
4. **Shopping Cart** - Cart management
5. **Checkout** - Customer information input
6. **Checkout Overview** - Order review and summary
7. **Checkout Complete** - Order confirmation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/MGEakin/matt-playwright-saucedemo-mcp.git
cd matt-playwright-saucedemo-mcp

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run smoke tests only
npm run test:smoke

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui

# View test reports
npm run report
```

## 🧪 Test Execution Results

✅ **All smoke tests passing**: 49/49 tests across 6 browsers
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- Microsoft Edge
- Google Chrome

## 🔧 MCP Server Integration

This framework is designed to work seamlessly with Playwright MCP server for:
- **Real-time page analysis** and element inspection
- **Interactive test development** and debugging
- **Page structure documentation** and validation
- **Reduced test flakiness** through actual page interaction verification

### MCP Usage Guidelines
- Analyze page elements before writing tests
- Document page structure and behavior
- Verify tests against actual page implementation
- Use controlled test environment for consistency

## 📁 Project Structure

```
├── pages/                     # Page Object Model classes
│   ├── BasePage.ts           # Abstract base page class
│   ├── LoginPage.ts          # Login page interactions
│   ├── ProductsPage.ts       # Product catalog management
│   ├── ProductDetailsPage.ts # Product detail operations
│   ├── ShoppingCartPage.ts   # Cart functionality
│   ├── CheckoutPage.ts       # Checkout form handling
│   ├── CheckoutOverviewPage.ts # Order summary operations
│   ├── CheckoutCompletePage.ts # Order completion verification
│   └── index.ts              # Page object exports
├── tests/                    # Test suites
│   └── smoke.spec.ts         # Smoke tests for all pages
├── utils/                    # Utilities and helpers
│   ├── testData.ts          # Test data constants
│   └── testHelper.ts        # Common test workflows
├── docs/                     # Documentation
│   └── prompt_01.md         # Project requirements and setup
├── playwright.config.ts      # Playwright configuration
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 🎯 Testing Best Practices

### ISTQB Principles Applied
- **Single Responsibility**: Each test verifies only one behavior
- **Test Isolation**: Tests are independent and can run in any order
- **Clear Naming**: Descriptive test names and meaningful assertions
- **Comprehensive Coverage**: Full user journey testing
- **Robust Waits**: Proper wait strategies to avoid flaky tests

### Playwright Best Practices
- Data-test attribute selectors for reliable element identification
- Network idle waiting for complete page loads
- Realistic user behavior simulation
- Comprehensive error handling and reporting

## 📊 Features

- ✅ **Multi-browser testing** across desktop and mobile
- ✅ **Comprehensive reporting** with HTML reports, screenshots, and videos
- ✅ **Page Object Model** for maintainable test code
- ✅ **TypeScript support** with strict type checking
- ✅ **Test data management** with constants and utilities
- ✅ **Smoke test suite** with `@smoke` tagging
- ✅ **MCP server integration** for enhanced debugging
- ✅ **Professional configuration** following industry standards

## 🤝 Contributing

This project follows professional testing standards and welcomes contributions that maintain code quality and testing best practices.

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Matthew Eakin**  
ISTQB Certified Software Development Engineer in Test (SDET)

---

Built with ❤️ for reliable e-commerce testing automation
