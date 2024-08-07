import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import { CitiesScreen } from '../../../../src/components/demo/cities/CitiesScreen';

describe('CitiesScreen', () => {
  it('renders without error', () => {
    const component = render(<CitiesScreen />);

    expect(component).toMatchSnapshot();
  });
});
