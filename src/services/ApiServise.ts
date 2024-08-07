import configJson from 'config';

// could be private static, but we need it in test
export const BASE_SEARCH_URL_QUERY = `${configJson.baseUrl}${configJson.searchPath}?${configJson.searchQuery}`;
export const SEARCH_URL = `${configJson.baseUrl}${configJson.searchPath}`;

export class ApiService {
  // fetch strings, matched by containing `query` param
  static async searchNames<T>(query: string): Promise<T[]> {
    try {
      const response = await fetch(`${BASE_SEARCH_URL_QUERY}=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch data', error);
      throw error;
    }
  }

  // search some words to show to user initially
  static async initialSearch<T>(): Promise<T[]> {
    try {
      const response = await fetch(`${SEARCH_URL}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch data', error);
      throw error;
    }
  }
}
