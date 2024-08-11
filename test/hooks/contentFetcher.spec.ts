import { useContentFetcher } from '../../src/hooks/contentFetcher';
import { ApiService } from '../../src/services/ApiServise';
import { MockListStrings } from '../__mock__/mock';
import { act, renderHook, waitFor } from '@testing-library/react';

jest.mock('../../src/services/ApiServise');

describe('useContentFetcher', () => {
  it('correctly updates state when idle', () => {
    const { result } = renderHook(() => useContentFetcher(undefined));

    const [state, setQuery] = result.current;

    expect(state).toEqual({ isError: false, isLoading: true, data: [], query: '' });
    expect(typeof setQuery).toBe('function');
  });

  it('correctly updates state when fetching initial data', () => {
    const { result } = renderHook(() => useContentFetcher(''));

    const [state, setQuery] = result.current;

    expect(state).toEqual({ isError: false, isLoading: true, data: [], query: '' });
    expect(typeof setQuery).toBe('function');
  });

  it('correctly updates state when fetching data for query', async () => {
    ApiService.searchNames = jest.fn(() => Promise.resolve([...MockListStrings])) as any;

    const { result } = renderHook(() => useContentFetcher('jquery'));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setQuery] = result.current;

    act(() => {
      setQuery('new query');
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        isLoading: false,
        isError: false,
        data: MockListStrings,
        query: 'new query',
      });
    });
  });

  it('correctly updates state when fetching data error', async () => {
    ApiService.searchNames = jest.fn(() => Promise.reject('Error'));

    const { result } = renderHook(() => useContentFetcher('jquery'));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setQuery] = result.current;

    act(() => {
      setQuery('new query');
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        isLoading: false,
        isError: true,
        data: [],
        query: 'new query',
      });
    });
  });

  it('correctly updates state when fetching fast multiple queries', async () => {
    ApiService.searchNames = jest.fn(() => Promise.reject('Error'));
    ApiService.initialSearch = jest.fn(() => Promise.resolve(MockListStrings)) as any;

    const { result } = renderHook(() => useContentFetcher('jquery'));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setQuery] = result.current;

    act(() => {
      setQuery('new query');
      setQuery('');
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        isLoading: false,
        isError: false,
        data: MockListStrings,
        query: '',
      });
    });

    act(() => {
      setQuery('');
      setQuery('new query');
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        isLoading: false,
        isError: true,
        data: [],
        query: 'new query',
      });
    });
  });
});
