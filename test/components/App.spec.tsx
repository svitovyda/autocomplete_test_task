import { App } from '../../src/App';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

describe('App', () => {
  it('renders without error', () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });
});
