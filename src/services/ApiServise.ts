import configJson from 'config';

// could be private static, but we need it in test
export const BASE_SEARCH_URL_QUERY = `${configJson.baseUrl}${configJson.searchPath}?${configJson.searchQuery}`;

export class ApiService {
  static async searchNames(query: string): Promise<string[]> {
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
}
