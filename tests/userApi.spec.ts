// tests/userApi.spec.ts
import { test, expect } from '@playwright/test';
import { ApiFactory } from '../utils/apiFactory'; // Our API Factory
import { logger } from '../utils/logger'; // Our Logger Facade
import { UserApi } from '../apis/userApi'; // Our User API Page Object
import ApiContext from '../utils/apiContext';

// Define a test suite for User API operations
test.describe('User API Tests', () => {
  let userApi: UserApi; // Declare our UserApi instance

  // `test.beforeAll` hook: Runs once before all tests in this describe block.
  // Playwright's `request` fixture provides the APIRequestContext, which is then passed to our factory.
  test.beforeAll(async ({ playwright }) => {
    // Get an instance of our UserApi from the ApiFactory
    // This uses our Factory Pattern to create the API object
    userApi = ApiFactory.getUserApi( await playwright.request.newContext());
    logger.info('User API tests suite started.');
  });

  // Test case 1: Verify getting details for a specific user
  test('Should get user details with given userId', async () => {
    const userId = 2; // User ID to retrieve
    const response = await userApi.getUser(userId); // Use UserApi's method
    // Assertions:
    expect(response.ok()).toBeTruthy(); // Verify HTTP status is 2xx
    const responseBody = await response.json(); // Parse response body as JSON
    expect(responseBody.data.id).toBe(userId); // Verify the user ID in the response
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in'); // Verify other data points
    expect(responseBody.data.first_name).toBe('Janet');
    logger.info(`User details retrieved successfully for ID: ${userId}`);
  });

  // Test case 2: Verify creating a new user
  test('Should create a new user successfully', async () => {
    const userData = { name: 'morpheus', job: 'leader' };
    const response = await userApi.createUser(userData);
    // Assertions:
    expect(response.status()).toBe(201); // Verify HTTP status is 201 Created
    const responseBody = await response.json();
    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.id).not.toBeNull(); // Verify ID is generated
    expect(responseBody.createdAt).not.toBeNull(); // Verify creation timestamp
    logger.info(`New user created with ID: ${responseBody.id}`);
  });

  // Test case 3: Verify updating an existing user (PUT request)
  test('Should update an existing user with given userId', async () => {
    const userId = '2';
    const updatedUserData = { name: 'morpheus', job: 'zion resident' };
    const response = await userApi.updateUser(userId, updatedUserData);
    // Assertions:
    expect(response.ok()).toBeTruthy(); // Verify HTTP status is 2xx
    const responseBody = await response.json();
    expect(responseBody.name).toBe(updatedUserData.name);
    expect(responseBody.job).toBe(updatedUserData.job);
    expect(responseBody.updatedAt).not.toBeNull(); // Verify update timestamp
    logger.info(`User updated with ID: ${userId} and values: ${JSON.stringify(responseBody)}`);
  });

  // Test case 4: Verify deleting a user
  test('Should delete a user with given userId', async () => {
    const userId = '2';
    const response = await userApi.deleteUser(userId);
    // Assertions:
    expect(response.status()).toBe(204); // Verify HTTP status is 204 No Content
    // For 204, typically there's no response body, so no further body assertions
    logger.info(`User deleted with ID: ${userId}`);
  });

  // Test case 5: Verify listing users with pagination
  test('Should list users for a specific page', async () => {
    const pageNumber = 2;
    const response = await userApi.listUsers(pageNumber);
    // Assertions:
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.page).toBe(pageNumber);
    expect(responseBody.data).toBeInstanceOf(Array); // Ensure data is an array
    expect(responseBody.data.length).toBeGreaterThan(0); // Ensure data is not empty
    logger.info(`Users listed successfully for page: ${pageNumber}`);
  });

  // Test case 6 (Negative Scenario): Attempt to get a non-existent user
  test('Should return 404 for non-existent user', async () => {
    const nonExistentUserId = 9999;
    const response = await userApi.getUser(nonExistentUserId);
    // Assertions:
    expect(response.status()).toBe(404); // Verify HTTP status is 404 Not Found
    expect(response.statusText()).toBe('Not Found');
    // No response body typically for 404 on reqres.in for this endpoint
    logger.warn(`Attempted to retrieve non-existent user ${nonExistentUserId}, received 404.`);
  });

  // `test.afterAll` hook: Runs once after all tests in this describe block.
  // This is where you'd perform any global cleanup if necessary for API context.
  test.afterAll(async () => {
    // If ApiContext was configured to be globally closable, you'd do it here.
    await ApiContext.closeInstance(); // Uncomment if managing a globally persistent context that needs explicit disposal.
    logger.info('User API tests suite finished.');
  });
});
