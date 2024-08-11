import {
  initialInputQueryState,
  useInputQuery,
} from '../../../src/hooks/autocomplete/useInputQuery';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('useInputQuery', () => {
  it('should correctly init', () => {
    const { result } = renderHook(() => useInputQuery(1, 2));

    const [state, setInput] = result.current;

    expect(state).toEqual(initialInputQueryState);
    expect(typeof setInput).toBe('function');
    // expect(typeof setQuery).toBe('function');
  });

  it('should correctly handle setInput, too short string', async () => {
    const { result } = renderHook(() => useInputQuery(1, 2));
    const [state, setInput] = result.current;
    expect(state).toEqual(initialInputQueryState);

    act(() => {
      setInput('a');
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({ ...initialInputQueryState, input: 'a' });
    });
  });

  it('should correctly handle setInput and change query for long string and empty string', async () => {
    const { result } = renderHook(() => useInputQuery(10, 2));
    const [state, setInput] = result.current;
    expect(state).toEqual(initialInputQueryState);

    act(() => {
      setInput('abc');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({ ...initialInputQueryState, input: 'abc' });
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'abc',
        query: 'abc',
      });
    });

    act(() => {
      setInput('d');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'd',
        query: 'abc',
      });
    });

    act(() => {
      setInput('cde');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'cde',
        query: 'abc',
      });
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'cde',
        query: 'cde',
      });
    });

    act(() => {
      setInput('');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: '',
        query: 'cde',
      });
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: '',
        query: '',
      });
    });
  });
});
