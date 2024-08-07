import { useContentFetcher } from '../../src/hooks/contentFetcher';
import { ApiService } from '../../src/services/ApiServise';
import { MockList } from '../__mock__/mock';
import { act, renderHook, waitFor } from '@testing-library/react';

jest.mock('../../src/services/ApiServise');

describe('useContentFetcher', () => {
  it('correctly updates state when idle', () => {
    const { result } = renderHook(() => useContentFetcher(undefined));

    const [state, setQuery] = result.current;

    expect(state).toEqual({ isError: false, isLoading: false, data: [] });
    expect(typeof setQuery).toBe('function');
  });

  it('correctly updates state when fetching initial data', () => {
    const { result } = renderHook(() => useContentFetcher(''));

    const [state, setQuery] = result.current;

    expect(state).toEqual({ isError: false, isLoading: true, data: [] });
    expect(typeof setQuery).toBe('function');
  });

  it('correctly updates state when fetching data for query', async () => {
    ApiService.searchNames<string> = jest.fn(() => Promise.resolve([...MockList]));

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
        data: MockList,
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
      });
    });
  });
});
