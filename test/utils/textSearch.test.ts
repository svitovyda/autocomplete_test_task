import { filterData } from '../../src/utils/textSearch';
import { MockList } from '../__mock__/mock';

describe('filterData', () => {
  it('should return all items when query is empty', () => {
    expect(filterData(MockList, '', true)).toEqual(MockList);
    expect(filterData(MockList, '', false)).toEqual(MockList);
  });

  it('should return an empty array when no items contain the query', () => {
    expect(filterData(MockList, 'nonexistentNONEXISTENT', true)).toEqual([]);
    expect(filterData(MockList, 'nonexistentNONEXISTENT', false)).toEqual([]);
  });

  it('should return empty array when list is empty', () => {
    expect(filterData([], '', true)).toEqual([]);
    expect(filterData([], '', false)).toEqual([]);
    expect(filterData([], 'e', true)).toEqual([]);
    expect(filterData([], 'e', false)).toEqual([]);
  });

  it('should return items that contain the query (case-sensitive)', () => {
    expect(filterData(MockList, 'test', true)).toEqual([
      'abc_test_def',
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
    ]);
  });

  it('should return items that contain the query (case-insensitive)', () => {
    expect(filterData(MockList, 'Test', false)).toEqual([
      'abc_test_def',
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
    ]);
  });
});
