import { filterData } from '../../src/utils/textSearch';
import { MockList } from '../__mock__/mock';

interface TestItem {
  name: string;
  id: number;
  rnd1: 4;
  rnd2: boolean;
}

const toLabel = (item: TestItem): string => item.name;

const eq = <T>(item: T) => item as string;
describe('filterData', () => {
  it('should return all items when query is empty', () => {
    expect(filterData(MockList, '', true, eq)).toEqual(MockList);
    expect(filterData(MockList, '', false, eq)).toEqual(MockList);
  });

  it('should return an empty array when no items contain the query', () => {
    expect(filterData(MockList, 'nonexistentNONEXISTENT', true, eq)).toEqual([]);
    expect(filterData(MockList, 'nonexistentNONEXISTENT', false, eq)).toEqual([]);
  });

  it('should return empty array when list is empty', () => {
    expect(filterData([], '', true, eq)).toEqual([]);
    expect(filterData([], '', false, eq)).toEqual([]);
    expect(filterData([], 'e', true, eq)).toEqual([]);
    expect(filterData([], 'e', false, eq)).toEqual([]);
  });

  it('should return items that contain the query (case-sensitive)', () => {
    expect(filterData(MockList, 'test', true, eq)).toEqual([
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
    expect(filterData(MockList, 'Test', false, eq)).toEqual([
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

  it('correctly works with objects', () => {
    const data: TestItem[] = MockList.map((s, i) => ({
      name: s,
      id: i,
      rnd1: 4,
      rnd2: true,
    }));

    expect(filterData(data, 'test', false, toLabel)).toEqual([
      {
        id: 0,
        name: 'abc_test_def',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 1,
        name: 'TestRandom1',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 2,
        name: 'another-test23',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 3,
        name: 'thisIs_test4',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 4,
        name: 'testxyzabc_Test',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 5,
        name: 'Ghi_test1jktest2ltest3',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 6,
        name: 'lmntestop',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 7,
        name: 'uv_test_wxyz',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 8,
        name: 'test123abc',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 9,
        name: 'opqtestrst',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 10,
        name: 'word_with_test',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 11,
        name: 'thetestinmiddle',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 12,
        name: 'testStartWithTest',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 13,
        name: 'endwithtest',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 14,
        name: 'more_test_here',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 15,
        name: 'A_test_bc_test',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 16,
        name: 'randteststr',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 17,
        name: 'sometesttxt',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 18,
        name: 'stillteston6',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 19,
        name: 'yet_another_test',
        rnd1: 4,
        rnd2: true,
      },
    ]);

    expect(filterData(data, 'test', true, toLabel)).toEqual([
      {
        id: 0,
        name: 'abc_test_def',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 2,
        name: 'another-test23',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 3,
        name: 'thisIs_test4',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 4,
        name: 'testxyzabc_Test',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 5,
        name: 'Ghi_test1jktest2ltest3',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 6,
        name: 'lmntestop',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 7,
        name: 'uv_test_wxyz',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 8,
        name: 'test123abc',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 9,
        name: 'opqtestrst',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 10,
        name: 'word_with_test',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 11,
        name: 'thetestinmiddle',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 12,
        name: 'testStartWithTest',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 13,
        name: 'endwithtest',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 14,
        name: 'more_test_here',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 15,
        name: 'A_test_bc_test',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 16,
        name: 'randteststr',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 17,
        name: 'sometesttxt',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 18,
        name: 'stillteston6',
        rnd1: 4,
        rnd2: true,
      },
      {
        id: 19,
        name: 'yet_another_test',
        rnd1: 4,
        rnd2: true,
      },
    ]);
  });
});
