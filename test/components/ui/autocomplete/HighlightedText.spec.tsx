import { HighlightedText } from '../../../../src/components/ui/autocomplete/HighlightedText';
import type { QueryType } from '../../../../src/utils/textSearch';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

const mockString: string = 'test_Test_some_TEST_halo';
const query: QueryType = 'test';

describe('HighlightedText', () => {
  it('renders without error empty', () => {
    const component = render(<HighlightedText query="" text="" />);

    expect(component).toMatchSnapshot();
  });

  it('renders "test_Test_some_TEST_halo", empty query', () => {
    const component = render(<HighlightedText query="" text={mockString} />);

    expect(component).toMatchSnapshot();
  });

  it('renders "test_Test_some_TEST_halo", no case sensitive, query="test"', () => {
    const component = render(<HighlightedText query={query} text={mockString} />);

    expect(component).toMatchSnapshot();
  });

  it('renders "test_Test_some_TEST_halo", case sensitive, query="test"', () => {
    const component = render(<HighlightedText query={query} text={mockString} />);

    expect(component).toMatchSnapshot();
  });
});
