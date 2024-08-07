import { App } from '../../src/App';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

jest.mock('../../src/components/demo/cities/CitiesScreen', () => ({
  CitiesScreen: () => <div>CitiesScreen Mock</div>,
}));

jest.mock('../../src/components/demo/words/WordsScreen', () => ({
  WordsScreen: () => <div>WordsScreen Mock</div>,
}));

describe('App', () => {
  it('renders without error', () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });
});
