import { DropDown } from '../../../../src/components/ui/autocomplete/DropDown';
import type { DataArrayType } from '../../../../src/hooks/autocomplete/useDataShow';
import type { DictionaryItem } from '../../../../src/models/Autocomplete';
import {
  MockListObjects,
  MockListStrings,
  type TestItem,
  toDictionaryItemObject,
  toDictionaryItemString,
} from '../../../__mock__/mock';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

const mockString: DataArrayType<DictionaryItem<string>> =
  MockListStrings.map(toDictionaryItemString);
const mockObject: DataArrayType<DictionaryItem<TestItem>> =
  MockListObjects.map(toDictionaryItemObject);

describe('DropDown', () => {
  it('renders without error empty', () => {
    const component = render(<DropDown items={[]} onSelectItem={jest.fn()} />);

    expect(component).toMatchSnapshot();
  });

  it('renders without error strings, no query', () => {
    const component = render(<DropDown items={mockString} onSelectItem={jest.fn()} />);

    expect(component).toMatchSnapshot();
  });

  it('renders without error objects, no query', () => {
    const component = render(<DropDown items={mockObject} onSelectItem={jest.fn()} />);

    expect(component).toMatchSnapshot();
  });

  it('renders without error strings, query="test"', () => {
    const component = render(<DropDown items={mockString} onSelectItem={jest.fn()} query="test" />);

    expect(component).toMatchSnapshot();
  });

  it('renders without error objects, query="test"', () => {
    const component = render(<DropDown items={mockObject} onSelectItem={jest.fn()} query="test" />);

    expect(component).toMatchSnapshot();
  });
});
