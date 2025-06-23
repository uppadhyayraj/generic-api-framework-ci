// utils/apiFactory.ts (Updated)
import { APIRequestContext } from '@playwright/test'; // Or 'puppeteer' depending on context
import { UserApi } from '../apis/userApi';
import { RegisterApi } from '../apis/registerApi'; // New import for the RegisterApi class

/**
 * Updated factory class for creating instances of various API classes.
 * Now includes a method for RegisterApi.
 */
export class ApiFactory {
  public static getUserApi(requestContext: APIRequestContext): UserApi {
    return new UserApi(requestContext);
  }

  /**
   * Retrieves an instance of the RegisterApi.
   * @param requestContext The APIRequestContext to use for the API instance.
   * @returns An instance of RegisterApi.
   */
  public static getRegisterApi(requestContext: APIRequestContext): RegisterApi {
    return new RegisterApi(requestContext);
  }

  /**
   * A more generic factory method to get any API by name.
   * This demonstrates a scalable way to add new APIs to the factory.
   */
  public static getApi(apiName: string, requestContext: APIRequestContext): any {
    switch (apiName) {
      case 'UserApi':
        return new UserApi(requestContext);
      case 'RegisterApi': // New case added for the RegisterApi
        return new RegisterApi(requestContext);
      default:
        throw new Error(`API "${apiName}" not found in ApiFactory.`);
    }
  }
}
