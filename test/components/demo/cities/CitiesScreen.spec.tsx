import { CitiesScreen } from '../../../../src/components/demo/cities/CitiesScreen';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

jest.mock('../../../../src/components/demo/cities/MapView', () => ({
  MapView: (props: any) => (
    <div>
      MapView Mock
      <pre>{JSON.stringify(props)}</pre>
    </div>
  ),
}));

describe('CitiesScreen', () => {
  it('renders without error', () => {
    const component = render(<CitiesScreen />);

    expect(component).toMatchSnapshot();
  });
});
