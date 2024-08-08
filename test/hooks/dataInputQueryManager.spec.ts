import { type ShowItem, convertToShow, useDataInputManager } from '../../src/hooks/dataInputQueryManager';
import { MockList } from '../__mock__/mock';
import { act, renderHook, waitFor } from '@testing-library/react';

const eq = <T>(a: T): T => a;

interface TestItem {
  name: string;
  id: number;
}

interface TestItem2 extends TestItem {
  rnd1: number;
  rnd2: boolean;
}

const toLabel = (item: TestItem): string => item.name;
const toId = (item: TestItem): number => item.id;

const abSearch: ShowItem[] = [
  { id: 'abc_test_def', label: 'abc_test_def' },
  { id: 'testxyzabc_Test', label: 'testxyzabc_Test' },
  { id: 'test123abc', label: 'test123abc' },
];

describe('convertToShow', () => {
  it('correctly works with strings', () => {
    expect(convertToShow(MockList)).toEqual([
      { id: 'abc_test_def', label: 'abc_test_def' },
      { id: 'TestRandom1', label: 'TestRandom1' },
      { id: 'another-test23', label: 'another-test23' },
      { id: 'thisIs_test4', label: 'thisIs_test4' },
      { id: 'testxyzabc_Test', label: 'testxyzabc_Test' },
    ]);
  });

  it('correctly works with objects', () => {
    const data: TestItem2[] = MockList.map((s, i) => ({
      name: s,
      id: i,
      rnd1: Math.random() * 100 - 50,
      rnd2: Math.random() >= 0.5,
    }));

    expect(convertToShow(data, toId, toLabel, 4)).toEqual([
      { id: 0, label: 'abc_test_def' },
      { id: 1, label: 'TestRandom1' },
      { id: 2, label: 'another-test23' },
      { id: 3, label: 'thisIs_test4' },
    ]);
  });
});

describe('useDataInputManager', () => {
  it('correctly updates state when idle, empty data', () => {
    const { result } = renderHook(() => useDataInputManager<string>([]));

    const [state, setInput, setItemId] = result.current;

    expect(state).toEqual({ input: '', query: '', itemsToShow: [], selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');
  });

  it('correctly updates state when idle, set data', () => {
    const { result } = renderHook(() => useDataInputManager<string>(MockList));

    const [state, setInput, setItemId] = result.current;

    const ItemsToShow = MockList.slice(0, 5).map((s) => ({ id: s, label: s }));

    expect(state).toEqual({
      input: '',
      query: '',
      itemsToShow: ItemsToShow,
      selectedItem: undefined,
    });

    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');

    const { result: res2 } = renderHook(() =>
      useDataInputManager<string>(MockList, 1, 2, true, eq, eq, false, true, 10)
    );

    const [state2, setInput2, setItemId2] = res2.current;

    const ItemsToShow2 = MockList.slice(0, 10).map((s) => ({ id: s, label: s }));

    expect(state2).toEqual({
      input: '',
      query: '',
      itemsToShow: ItemsToShow2,
      selectedItem: undefined,
    });
    expect(typeof setInput2).toBe('function');
    expect(typeof setItemId2).toBe('function');
  });

  it('correctly updates state when idle, set data, no showInitOnEmptyInput', () => {
    const { result } = renderHook(() => useDataInputManager<string>(MockList, 1, 2, true, eq, eq, false, false, 5));

    const [state, setInput, setItemId] = result.current;

    expect(state).toEqual({ input: '', query: '', itemsToShow: [], selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');
  });

  it('correctly updates state and query when input changes to non-empty string', async () => {
    const { result } = renderHook(() => useDataInputManager<string>(MockList, 1, 2, true, eq, eq, false, false));

    const [state, setInput, setItemId] = result.current;

    expect(state).toEqual({ input: '', query: '', itemsToShow: [], selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');

    act(() => {
      setInput('a');
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'a',
        query: '',
        itemsToShow: [],
        selectedItem: undefined,
      });
    });

    act(() => {
      setInput('b');
    });

    // query should not pick it as it's shorter than 2 chars
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'b',
        query: '',
        itemsToShow: [],
        selectedItem: undefined,
      });
    });

    act(() => {
      setInput('c');
    });

    // query should not pick it as it's shorter than 2 chars
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'c',
        query: '',
        itemsToShow: [],
        selectedItem: undefined,
      });
    });

    act(() => {
      setInput('ab');
    });
    // query should be updated
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'ab',
        query: '', // waiting for debouncing
        itemsToShow: [],
        selectedItem: undefined,
      });
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'ab',
        query: 'ab', // debounced value dispatched
        itemsToShow: abSearch,
        selectedItem: undefined,
      });
    });

    act(() => {
      setInput('d');
    });
    // query should not pick it as it's shorter than 2 chars
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'd',
        query: 'ab',
        itemsToShow: abSearch,
        selectedItem: undefined,
      });
    });

    act(() => {
      setInput('ab');
    });
    // query should pick it
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'ab',
        query: 'ab',
        itemsToShow: abSearch,
        selectedItem: undefined,
      });
    });
  });

  it('correctly updates state and query when input changes to empty string', async () => {
    const { result } = renderHook(() => useDataInputManager<string>(MockList, 1, 2, true, eq, eq, false, false));

    const [state, setInput, setItemId] = result.current;

    expect(state).toEqual({ input: '', query: '', itemsToShow: [], selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');

    act(() => {
      setInput('ab');
    });
    // query should pick it
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: 'ab',
        query: 'ab',
        itemsToShow: abSearch,
        selectedItem: undefined,
      });
    });

    act(() => {
      setInput('');
    });
    // if input is empty, query should occasionally be amty to dispatch onQueryChange and affect
    // behaviour on showInitOnEmptyInput=true
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: '',
        query: 'ab',
        itemsToShow: abSearch,
        selectedItem: undefined,
      });
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: '',
        query: '',
        itemsToShow: [],
        selectedItem: undefined,
      });
    });
  });

  it('should recalculate itemsToShow if autoCalculate and query changed', async () => {
    const { result } = renderHook(() => useDataInputManager<string>(MockList, 1));

    const [state, setInput, setItemId] = result.current;

    const items = MockList.slice(0, 5).map((s) => ({ id: s, label: s }));

    expect(state).toEqual({ input: '', query: '', itemsToShow: items, selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');

    const input = 'test';

    act(() => {
      setInput('test');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: '',
        itemsToShow: items,
        selectedItem: undefined,
      });
    });
    const search = [
      { id: 'abc_test_def', label: 'abc_test_def' },
      { id: 'TestRandom1', label: 'TestRandom1' },
      { id: 'another-test23', label: 'another-test23' },
      { id: 'thisIs_test4', label: 'thisIs_test4' },
      { id: 'testxyzabc_Test', label: 'testxyzabc_Test' },
    ];
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: input,
        itemsToShow: search,
        selectedItem: undefined,
      });
    });
  });

  it('should recalculate itemsToShow if autoCalculate and query changed, case sensitive', async () => {
    const { result } = renderHook(() => useDataInputManager<string>(MockList, 1, 3, true, eq, eq, true));

    const [state, setInput, setItemId] = result.current;

    const items = MockList.slice(0, 5).map((s) => ({ id: s, label: s }));

    expect(state).toEqual({ input: '', query: '', itemsToShow: items, selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');

    const input = 'test';

    act(() => {
      setInput('test');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: '',
        itemsToShow: items,
        selectedItem: undefined,
      });
    });
    const search = [
      { id: 'abc_test_def', label: 'abc_test_def' },
      { id: 'another-test23', label: 'another-test23' },
      { id: 'thisIs_test4', label: 'thisIs_test4' },
      { id: 'testxyzabc_Test', label: 'testxyzabc_Test' },
      { id: 'Ghi_test1jktest2ltest3', label: 'Ghi_test1jktest2ltest3' },
    ];
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: input,
        itemsToShow: search,
        selectedItem: undefined,
      });
    });
  });

  it('should correctly work with data as list of objects, dataLabel, dataId', async () => {
    const data: TestItem[] = MockList.map((s, i) => ({ name: s, id: i }));

    const { result } = renderHook(() => useDataInputManager<TestItem>(data, 1, 3, true, toLabel, toId, true, true, 4));

    const [state, setInput, setItemId] = result.current;

    const items = data.slice(0, 4).map((item) => ({ id: item.id, label: item.name }));

    expect(state).toEqual({ input: '', query: '', itemsToShow: items, selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');

    const input = 'test';

    act(() => {
      setInput('test');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: '',
        itemsToShow: items,
        selectedItem: undefined,
      });
    });
    const search = [
      { id: 0, label: 'abc_test_def' },
      { id: 2, label: 'another-test23' },
      { id: 3, label: 'thisIs_test4' },
      { id: 4, label: 'testxyzabc_Test' },
    ];
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: input,
        itemsToShow: search,
        selectedItem: undefined,
      });
    });
  });

  it('should react on setSelectedItemId, items are objects', async () => {
    const data: TestItem[] = MockList.map((s, i) => ({ name: s, id: i }));

    const { result } = renderHook(() => useDataInputManager<TestItem>(data, 1, 3, true, toLabel, toId, true, true, 4));

    const [state, setInput, setItemId] = result.current;

    const items = data.slice(0, 4).map((item) => ({ id: item.id, label: item.name }));

    expect(state).toEqual({ input: '', query: '', itemsToShow: items, selectedItem: undefined });
    expect(typeof setInput).toBe('function');
    expect(typeof setItemId).toBe('function');

    const input = 'test';

    act(() => {
      setInput('test');
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: '',
        itemsToShow: items,
        selectedItem: undefined,
      });
    });
    const search = [
      { id: 0, label: 'abc_test_def' },
      { id: 2, label: 'another-test23' },
      { id: 3, label: 'thisIs_test4' },
      { id: 4, label: 'testxyzabc_Test' },
    ];
    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input,
        query: input,
        itemsToShow: search,
        selectedItem: undefined,
      });
    });

    act(() => {
      setItemId(3);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        input: input,
        query: input,
        selectedItem: {
          itemData: {
            id: 3,
            name: 'thisIs_test4',
          },
          itemToShow: {
            id: 3,
            label: 'thisIs_test4',
          },
        },
        itemsToShow: search,
      });
    });
  });
});
