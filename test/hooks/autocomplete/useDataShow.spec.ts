import { type DataArrayType, useDataShow } from '../../../src/hooks/autocomplete/useDataShow';
import type { DictionaryItem, ShowItem } from '../../../src/models/Autocomplete';
import { eq } from '../../../src/utils/autocomplete';
import type { QueryType } from '../../../src/utils/textSearch';
import {
  MockListObjects,
  MockListStrings,
  type TestItem,
  toId,
  toLabel,
} from '../../__mock__/mock';
import { renderHook } from '@testing-library/react';

interface WrapperProps<T> {
  data: DataArrayType<T>;
  query?: QueryType;
  maxItems?: number;
  caseSensitive?: boolean;
}

const mockStringSearchResult: ShowItem[] = [
  { id: 'abc_test_def', label: 'abc_test_def' },
  { id: 'TestRandom1', label: 'TestRandom1' },
  { id: 'another-test23', label: 'another-test23' },
  { id: 'thisIs_test4', label: 'thisIs_test4' },
  { id: 'testxyzabc_Test', label: 'testxyzabc_Test' },
] as const;

const mockStringCaseSearchResult: ShowItem[] = [
  { id: 'abc_test_def', label: 'abc_test_def' },
  { id: 'another-test23', label: 'another-test23' },
  { id: 'thisIs_test4', label: 'thisIs_test4' },
  { id: 'testxyzabc_Test', label: 'testxyzabc_Test' },
  { id: 'Ghi_test1jktest2ltest3', label: 'Ghi_test1jktest2ltest3' },
] as const;

const mockObjectSearchResult: ShowItem[] = [
  { id: 0, label: 'abc_test_def' },
  { id: 2, label: 'TestRandom1' },
  { id: 3, label: 'another-test23' },
  { id: 4, label: 'thisIs_test4' },
  { id: 5, label: 'testxyzabc_Test' },
] as const;

const mockObjectCaseSearchResult: ShowItem[] = [
  { id: 0, label: 'abc_test_def' },
  { id: 3, label: 'another-test23' },
  { id: 4, label: 'thisIs_test4' },
  { id: 5, label: 'testxyzabc_Test' },
  { id: 6, label: 'Ghi_test1jktest2ltest3' },
] as const;

const mockStringResult: DictionaryItem<string>[] = MockListStrings.map((s) => ({
  itemData: s,
  itemToShow: { id: s, label: s },
}));
const mockObjectResult: DictionaryItem<TestItem>[] = MockListObjects.map((o, i) => ({
  itemData: o,
  itemToShow: { id: i, label: o.name },
}));

describe('useDataShow', () => {
  it('correctly works on strings data, no autoCalculate', () => {
    const props: WrapperProps<string> = {
      data: [],
      maxItems: 10,
    };

    const { result, rerender } = renderHook(
      ({ data, query, maxItems }: WrapperProps<string>) =>
        useDataShow(data, eq, eq, maxItems, false, false, query),
      { initialProps: props }
    );
    expect(result.current).toEqual([]);

    props.data = MockListStrings;
    rerender(props);
    expect(result.current).toEqual(mockStringResult.slice(0, 10));

    props.maxItems = undefined;
    rerender(props);
    expect(result.current).toEqual(mockStringResult.slice(0, 5));
  });

  it('correctly works on strings data, autoCalculate', () => {
    const props: WrapperProps<string> = {
      data: [],
    };

    const { result, rerender } = renderHook(
      ({ data, query, maxItems, caseSensitive }: WrapperProps<string>) =>
        useDataShow(data, eq, eq, maxItems, true, caseSensitive, query),
      { initialProps: props }
    );
    expect(result.current).toEqual([]);

    props.data = MockListStrings;
    rerender(props);
    expect(result.current).toEqual(mockStringResult.slice(0, 5));

    props.query = 'test';
    rerender(props);
    expect(result.current.map((d) => d.itemToShow)).toEqual(mockStringSearchResult);

    props.caseSensitive = true;
    rerender(props);
    expect(result.current.map((d) => d.itemToShow)).toEqual(mockStringCaseSearchResult);
  });

  it('correctly works on Objects data, no autoCalculate', () => {
    const props: WrapperProps<TestItem> = {
      data: [],
      maxItems: 10,
    };

    const { result, rerender } = renderHook(
      ({ data, query, maxItems }: WrapperProps<TestItem>) =>
        useDataShow(data, toLabel, toId, maxItems, false, false, query),
      { initialProps: props }
    );
    expect(result.current).toEqual([]);

    props.data = MockListObjects;
    rerender(props);
    expect(result.current).toEqual(mockObjectResult.slice(0, 10));

    props.maxItems = undefined;
    rerender(props);
    expect(result.current).toEqual(mockObjectResult.slice(0, 5));
  });

  it('correctly works on Objects data, autoCalculate', () => {
    const props: WrapperProps<TestItem> = {
      data: [],
    };

    const { result, rerender } = renderHook(
      ({ data, query, maxItems, caseSensitive }: WrapperProps<TestItem>) =>
        useDataShow(data, toLabel, toId, maxItems, true, caseSensitive, query),
      { initialProps: props }
    );
    expect(result.current).toEqual([]);

    props.data = MockListObjects;
    rerender(props);
    expect(result.current).toEqual(mockObjectResult.slice(0, 5));

    props.query = 'test';
    rerender(props);
    expect(result.current.map((d) => d.itemToShow)).toEqual(mockObjectSearchResult);

    props.caseSensitive = true;
    rerender(props);
    expect(result.current.map((d) => d.itemToShow)).toEqual(mockObjectCaseSearchResult);
  });
});
