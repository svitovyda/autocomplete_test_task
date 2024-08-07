import { LoaderAnimation } from '../../../src/components/ui/LoaderAnimation';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

describe('LoaderAnimation', () => {
  it('renders without error', () => {
    const component = render(<LoaderAnimation />);

    expect(component).toMatchSnapshot();
  });
});
