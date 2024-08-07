import { ApiService, BASE_SEARCH_URL_QUERY } from '../../src/services/ApiServise';
import { MockList } from '../__mock__/mock';
import fetchMock from 'fetch-mock';

describe('ApiService searchNames', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches serch results for "test"', async () => {
    fetchMock.getOnce(`${BASE_SEARCH_URL_QUERY}=test`, {
      status: 200,
      body: MockList,
      headers: { 'Content-Type': 'application/json' },
    });

    const modules = await ApiService.searchNames('test');

    expect(modules).toEqual(MockList);
  });

  it('encodes search parameter', async () => {
    fetchMock.getOnce(`${BASE_SEARCH_URL_QUERY}=%40babel%2Fpreset-env`, {
      status: 200,
      body: MockList,
      headers: { 'Content-Type': 'application/json' },
    });

    const modules = await ApiService.searchNames('@babel/preset-env');

    expect(modules).toEqual(MockList);
  });

  it('handles failed fetch', async () => {
    fetchMock.getOnce(`${BASE_SEARCH_URL_QUERY}=test`, {
      status: 500,
    });

    await expect(ApiService.searchNames('test')).rejects.toThrow('Failed to fetch data');
  });
});
