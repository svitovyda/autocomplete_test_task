import type { DictionaryItem } from '../../src/models/Autocomplete';

export const MockListStrings = [
  'abc_test_def',
  'no_t_e_s_t',
  'TestRandom1',
  'another-test23',
  'thisIs_test4',
  'testxyzabc_Test',
  'Ghi_test1jktest2ltest3',
  'lmntestop',
  'uv_test_wxyz',
  'test123abc',
  'opqtestrst',
  'word_with_test',
  'thetestinmiddle',
  'testStartWithTest',
  'endwithtest',
  'more_test_here',
  'A_test_bc_test',
  'randteststr',
  'sometesttxt',
  'stillteston6',
  'yet_another_test',
] as const;

export interface TestItem {
  name: string;
  id: number;
  rnd1?: number;
  rnd2?: boolean;
}

export const MockListObjects = MockListStrings.map(
  (s, i): TestItem => ({ id: i, name: s, rnd1: 50 - i * 2 - 1 / (i + 1), rnd2: i % 3 !== 0 })
);

export const toLabel = (item: TestItem): string => item.name;
export const toId = (item: TestItem): number => item.id;

export const toDictionaryItemString = (s: string): DictionaryItem<string> => ({
  itemData: s,
  itemToShow: {
    id: s,
    label: s,
  },
});

export const toDictionaryItemObject = (o: TestItem): DictionaryItem<TestItem> => ({
  itemData: o,
  itemToShow: {
    id: o.id,
    label: o.name,
  },
});
