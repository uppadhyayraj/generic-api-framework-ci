// apis/registerApi.ts
import BaseApi from './baseApi';
import { APIResponse } from '@playwright/test';
/**
 * The RegisterApi class provides methods to interact with the user registration endpoint.
 * It extends BaseApi to reuse common HTTP POST capabilities.
 */
export class RegisterApi extends BaseApi {
  /**
   * Registers a new user by sending a POST request to '/api/register'.
   * @param userData The data of the user to be registered (e.g., { email: "user@example.com", password: "securepassword" }).
   * @returns A promise that resolves to the Playwright APIResponse object.
   */
  async registerUser(userData: { email: string; password: string }): Promise<APIResponse> {
    return this.post('/api/register', userData);
  }

  /**
   * (Conceptual Example: adding more specific registration validations)
   * Registers a user and validates specific fields in the response.
   * This method would contain unique validation logic specific to registration.
   */
  async registerUserAndValidate(userData: { email: string; password: string }): Promise<APIResponse> {
    const response = await this.registerUser(userData);
    // Additional, specific validations for registration response might go here.
    // For instance, checking for specific 'id' or 'token' structure.
    return response;
  }
}
