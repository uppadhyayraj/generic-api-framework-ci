// apis/userApi.ts
import BaseApi from './baseApi';
import { APIResponse } from '@playwright/test';

/**
 * The UserApi class provides methods to interact with the user-related endpoints of the API.
 * It extends the BaseApi class, inheriting common HTTP functionalities, and provides
 * specific methods for retrieving, creating, updating, and deleting users, as well as fetching a list of users.
 */
export class UserApi extends BaseApi {

  /**
   * Retrieves a single user by their ID.
   * Endpoint: GET /api/users/{userId}
   * @param userId The unique identifier of the user (e.g., 2).
   * @returns A promise that resolves to the Playwright APIResponse object.
   */
  async getUser(userId: number): Promise<APIResponse> {
    return this.get(`/api/users/${userId}`);
  }

  /**
   * Creates a new user by sending a POST request.
   * Endpoint: POST /api/users
   * @param userData The data for the new user (e.g., { name: "morpheus", job: "leader" }).
   * @returns A promise that resolves to the Playwright APIResponse object.
   */
  async createUser(userData: { name: string; job: string }): Promise<APIResponse> {
    return this.post('/api/users', userData);
  }

  /**
   * Updates the user information for the specified user ID (PUT request).
   * Endpoint: PUT /api/users/{userId}
   * @param userId The unique identifier of the user to be updated.
   * @param userData The data to update the user with (e.g., { name: "morpheus", job: "zion resident" }).
   * @returns A promise that resolves to the Playwright APIResponse object.
   */
  async updateUser(userId: string, userData: { name: string; job: string }): Promise<APIResponse> {
    return this.put(`/api/users/${userId}`, userData);
  }

  /**
   * Deletes a user by their user ID.
   * Endpoint: DELETE /api/users/{userId}
   * @param userId The unique identifier of the user to be deleted.
   * @returns A promise that resolves to the Playwright APIResponse object.
   */
  async deleteUser(userId: string): Promise<APIResponse> {
    return this.delete(`/api/users/${userId}`);
  }

  /**
   * Fetches a list of users with optional pagination.
   * Endpoint: GET /api/users?page={pageNumber}
   * @param page The page number to retrieve (e.g., 2).
   * @returns A promise that resolves to the Playwright APIResponse object.
   */
  async listUsers(page: number): Promise<APIResponse> {
    return this.get(`/api/users?page=${page}`);
  }
}
