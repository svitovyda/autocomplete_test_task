import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import { WordsScreen } from '../../../../src/components/demo/words/WordsScreen';

describe('WordsScreen', () => {
  it('renders without error', () => {
    const component = render(<WordsScreen />);

    expect(component).toMatchSnapshot();
  });
});
