// utils/apiContext.ts
import { request, APIRequestContext } from '@playwright/test';
import config from '../playwright.config';

class ApiContext {
  private static instance: APIRequestContext | null; // Static variable to hold the single instance, can be null

  private constructor() { } // Private constructor to prevent direct instantiation

  /**
   * Returns the singleton instance of APIRequestContext.
   * If the instance does not exist, it creates a new one configured with the project's base URL and headers.
   * @returns A promise that resolves to the APIRequestContext instance.
   */
  public static async getInstance(): Promise<APIRequestContext> {
    if (!ApiContext.instance) { // Check if the instance has already been created
      ApiContext.instance = await request.newContext({ // Create a new Playwright APIRequestContext
        baseURL: config.use?.baseURL, // Inherit base URL from playwright.config.ts
        extraHTTPHeaders: config.use?.extraHTTPHeaders, // Inherit headers
      });
    }
    return ApiContext.instance; // Return the single instance
  }

  /**
   * Closes the existing APIRequestContext instance.
   * This should typically be called after all API tests have completed to clean up resources.
   */
  public static async closeInstance(): Promise<void> {
    if (ApiContext.instance) {
      await ApiContext.instance.dispose(); // Dispose of the Playwright APIRequestContext
      ApiContext.instance = null; // Reset the instance
    }
  }
}

export default ApiContext;
