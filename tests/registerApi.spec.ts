// tests/registerApi.spec.ts
import { test, expect } from '@playwright/test';
import { ApiFactory } from '../utils/apiFactory';
import { logger } from '../utils/logger';
import { RegisterApi } from '../apis/registerApi';
import { faker } from '@faker-js/faker';

// Define a test suite for Register API operations
test.describe('Register API Tests', () => {
  let registerApi: RegisterApi;

  // `test.beforeAll` hook: Runs once before all tests in this describe block.
  test.beforeAll(async ({ playwright }) => {
    registerApi = ApiFactory.getRegisterApi(await playwright.request.newContext());
    logger.info('Register API tests suite started.');
  });

  // Test case 1: Verify successful user registration
  test('Should register a new user successfully', async () => {
    // Allure annotations
    await test.step('Set test metadata', async () => {
      test.info().annotations.push(
        { type: 'severity', description: 'critical' },
        { type: 'tag', description: '@smoke' },
        { type: 'tag', description: '@registration' },
        { type: 'tag', description: '@positive' },
        { type: 'feature', description: 'User Registration' },
        { type: 'story', description: 'Successful user registration with valid credentials' },
        { type: 'owner', description: 'QA Team' }
      );
    });

    await test.step('Prepare test data', async () => {
      const userData = { email: 'eve.holt@reqres.in', password: 'pistol' };
      logger.info(`Preparing to register user with email: ${userData.email}`);
    });

    const userData = { email: 'eve.holt@reqres.in', password: 'pistol' };
    
    await test.step('Send registration request', async () => {
      const response = await registerApi.registerUser(userData);
      
      await test.step('Verify response status', async () => {
        expect(response.status()).toBe(200);
      });
      
      await test.step('Verify response body contains required fields', async () => {
        const responseBody = await response.json();
        expect(responseBody.id).not.toBeNull();
        expect(responseBody.token).not.toBeNull();
        logger.info(`New user registered with ID: ${responseBody.id} and token: ${responseBody.token}`);
      });
    });
  });

  // Test case 2 (Negative Scenario): Attempt registration with missing password
  test('Should return 400 for registration with missing password', async () => {
    // Allure annotations
    await test.step('Set test metadata', async () => {
      test.info().annotations.push(
        { type: 'severity', description: 'high' },
        { type: 'tag', description: '@regression' },
        { type: 'tag', description: '@registration' },
        { type: 'tag', description: '@negative' },
        { type: 'tag', description: '@validation' },
        { type: 'feature', description: 'User Registration' },
        { type: 'story', description: 'Registration validation for missing password' },
        { type: 'owner', description: 'QA Team' }
      );
    });

    await test.step('Prepare invalid test data', async () => {
      const userData = { email: 'sydney@fife', password: '' };
      logger.info(`Testing registration with missing password for email: ${userData.email}`);
    });

    const userData = { email: 'sydney@fife', password: '' };
    
    await test.step('Send registration request with missing password', async () => {
      const response = await registerApi.registerUser(userData);
      
      await test.step('Verify error response status', async () => {
        expect(response.status()).toBe(400);
      });
      
      await test.step('Verify error message in response', async () => {
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Missing password');
        logger.warn(`Attempted registration with missing password, received 400: ${responseBody.error}`);
      });
    });
  });

  // Test case 3: Verify successful user registration with dynamic data
  test('Should register user registration with dynamic data', async () => {
    // Allure annotations
    await test.step('Set test metadata', async () => {
      test.info().annotations.push(
        { type: 'severity', description: 'medium' },
        { type: 'tag', description: '@smoke' },
        { type: 'tag', description: '@registration' },
        { type: 'tag', description: '@dynamic' },
        { type: 'tag', description: '@faker' },
        { type: 'feature', description: 'User Registration' },
        { type: 'story', description: 'Registration with dynamically generated test data' },
        { type: 'owner', description: 'Automation Team' }
      );
    });

    let userData;
    await test.step('Generate dynamic test data using Faker', async () => {
      userData = {
        email: faker.internet.email({ provider: 'reqres.in' }),
        password: faker.internet.password({ length: 8, memorable: true })
      };
      logger.info(`Attempting to register user with email: ${userData.email}`);
    });
    
    await test.step('Send registration request with dynamic data', async () => {
      const response = await registerApi.registerUser(userData);
      
      // Note: Fixed the assertion - should be 200 for successful registration, not 400
      await test.step('Verify successful response status', async () => {
        expect(response.status()).toBe(200); // Changed from 400 to 200
      });
      
      await test.step('Verify response contains user data', async () => {
        const responseBody = await response.json();
        expect(responseBody.id).not.toBeNull();
        expect(responseBody.token).not.toBeNull();
        logger.info(`New user registered with ID: ${responseBody.id} and token: ${responseBody.token}`);
      });
    });
  });

  // `test.afterAll` hook: Runs once after all tests in this describe block
  test.afterAll(async () => {
    logger.info('Register API tests suite finished.');
  });
});