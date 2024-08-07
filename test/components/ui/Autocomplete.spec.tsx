import { Autocomplete } from '../../../src/components/ui/Autocomplete';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

describe('Autocomplete', () => {
  it('renders without error', () => {
    const component = render(<Autocomplete />);

    expect(component).toMatchSnapshot();
  });
});
