// apis/baseApi.ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { logger } from '../utils/logger'; // Import the logger facade

/**
 * Base class for all API interaction classes.
 * Provides common HTTP methods (GET, POST, PUT, DELETE) and integrates logging.
 */
class BaseApi {
  protected request: APIRequestContext; // Protected to be accessible by derived classes

  /**
   * Initializes the BaseApi with an APIRequestContext.
   * This context is typically obtained from the ApiContext singleton.
   * @param request The Playwright APIRequestContext instance.
   */
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Sends a GET request to the specified endpoint.
   * Logs the request and response status.
   * @param endpoint The API endpoint to send the GET request to (e.g., '/api/users/2').
   * @returns A Promise that resolves to the Playwright APIResponse.
   */
  async get(endpoint: string): Promise<APIResponse> {
    logger.info(`Sending GET request to: ${endpoint}`);
    const response = await this.request.get(endpoint);
    this.logResponseStatus(response, 'GET', endpoint); // Log the response status
    return response;
  }

  /**
   * Sends a POST request to the specified endpoint with the provided data.
   * Logs the request data and response status.
   * @param endpoint The API endpoint (e.g., '/api/users').
   * @param data The payload for the POST request.
   * @returns A Promise that resolves to the Playwright APIResponse.
   */
  async post(endpoint: string, data: any): Promise<APIResponse> {
    logger.info(`Sending POST request to: ${endpoint} with data: ${JSON.stringify(data)}`);
    const response = await this.request.post(endpoint, { data });
    this.logResponseStatus(response, 'POST', endpoint);
    return response;
  }

  /**
   * Sends a PUT request to the specified endpoint with the provided data.
   * Logs the request data and response status.
   * @param endpoint The API endpoint (e.g., '/api/users/2').
   * @param data The payload for the PUT request.
   * @returns A Promise that resolves to the Playwright APIResponse.
   */
  async put(endpoint: string, data?: any): Promise<APIResponse> {
    logger.info(`Sending PUT request to: ${endpoint} with data: ${JSON.stringify(data)}`);
    // Playwright's .put method expects 'data' directly, not wrapped in {data}
    const response = await this.request.put(endpoint, { data });
    this.logResponseStatus(response, 'PUT', endpoint);
    return response;
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   * Logs the request and response status.
   * @param endpoint The API endpoint (e.g., '/api/users/2').
   * @returns A Promise that resolves to the Playwright APIResponse.
   */
  async delete(endpoint: string): Promise<APIResponse> {
    logger.info(`Sending DELETE request to: ${endpoint}`);
    const response = await this.request.delete(endpoint);
    this.logResponseStatus(response, 'DELETE', endpoint);
    return response;
  }

  /**
   * Helper method to log the response status.
   * This is a "hook" operation that can be refined in subclasses if needed,
   * but provides a consistent logging template.
   * @param response The Playwright APIResponse object.
   * @param method The HTTP method used (e.g., 'GET', 'POST').
   * @param endpoint The endpoint that was called.
   */
  protected logResponseStatus(response: APIResponse, method: string, endpoint: string): void {
    if (response.ok()) {
      logger.info(`Response (${method} ${endpoint}): ${response.status()} ${response.statusText()}`);
    } else {
      logger.error(`Response ERROR (${method} ${endpoint}): ${response.status()} ${response.statusText()} - URL: ${response.url()}`);
      // Optionally log response body for errors
      response.text().then(text => logger.error(`Error Body: ${text}`)).catch(() => {});
    }
  }
}

export default BaseApi;
