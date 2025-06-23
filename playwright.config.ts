// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Directory where test files are located
  testDir: './tests',
  // Maximum time (in milliseconds) for a test to run
  timeout: 30000, // 30 seconds
  // Configuration for all tests
  use: {
    // Base URL for API requests, simplifying endpoint paths
    baseURL: 'https://reqres.in',
    // Common HTTP headers applied to all requests
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1', //This is API key which got from https://reqres.in/signup 

      // 'Authorization': `Bearer ${process.env.API_TOKEN}`, // Example for dynamic token
    },
    // Optional: Trace collection upon test failure for debugging
    trace: 'on-first-retry',
    // Optional: Context options for all requests (e.g., ignoreHTTPSErrors)
    // ignoreHTTPSErrors: true,
  },
  // Reporter to use for test results (e.g., 'html', 'list', 'json', 'junit')
  reporter: [
    ['list'], // Keep the list reporter for console output during test run
    ['allure-playwright', {
      outputFolder: 'allure-results', // This is where Allure's raw XML/JSON data will be stored
      suiteTitle: true,              // Show suite title in Allure report
      // Other options can be added here: allure.issueLinkTemplate, allure.tmsLinkTemplate etc.
    }],
  ],
  // Optional: Run tests in parallel to speed up execution
  // workers: process.env.CI ? 2 : undefined, // Example: 2 workers in CI, undefined (default) locally
  // Optional: Number of retries for flaky tests
  // retries: process.env.CI ? 2 : 0, // Example: 2 retries in CI, 0 locally
  // Optional: Define different projects for specific configurations (e.g., 'api', 'ui')
  // projects: [{ name: 'api', testMatch: 'tests/api/**/*.spec.ts' }],
};

export default config;
