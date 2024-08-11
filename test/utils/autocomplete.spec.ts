import { convertToShow } from '../../src/utils/autocomplete';
import { MockListObjects, MockListStrings } from '../__mock__/mock';

interface TestItem {
  name: string;
  id: number;
  rnd1: number;
  rnd2: boolean;
}

const toLabel = (item: TestItem): string => item.name;
const toId = (item: TestItem): number => item.id;

describe('convertToShow', () => {
  it('correctly works with strings', () => {
    expect(convertToShow(MockListStrings)).toEqual([
      { itemData: 'abc_test_def', itemToShow: { id: 'abc_test_def', label: 'abc_test_def' } },
      { itemData: 'no_t_e_s_t', itemToShow: { id: 'no_t_e_s_t', label: 'no_t_e_s_t' } },
      { itemData: 'TestRandom1', itemToShow: { id: 'TestRandom1', label: 'TestRandom1' } },
      { itemData: 'another-test23', itemToShow: { id: 'another-test23', label: 'another-test23' } },
      { itemData: 'thisIs_test4', itemToShow: { id: 'thisIs_test4', label: 'thisIs_test4' } },
    ]);
  });

  it('correctly works with objects', () => {
    expect(convertToShow(MockListObjects, toId, toLabel, 4)).toEqual([
      { itemData: MockListObjects[0], itemToShow: { id: 0, label: 'abc_test_def' } },
      { itemData: MockListObjects[1], itemToShow: { id: 1, label: 'no_t_e_s_t' } },
      { itemData: MockListObjects[2], itemToShow: { id: 2, label: 'TestRandom1' } },
      { itemData: MockListObjects[3], itemToShow: { id: 3, label: 'another-test23' } },
    ]);
  });
});
