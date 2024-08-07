import { Main } from '../../src/components/Main';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

describe('Main', () => {
  it('renders without error', () => {
    const component = render(<Main />);

    expect(component).toMatchSnapshot();
  });
});
