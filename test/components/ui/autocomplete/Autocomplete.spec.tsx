import { Autocomplete } from '../../../../src/components/ui/autocomplete/Autocomplete';
import { MockListObjects, MockListStrings, toId, toLabel } from '../../../__mock__/mock';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

describe('Autocomplete', () => {
  it('renders without error empty', () => {
    const component = render(<Autocomplete data={[]} />);

    expect(component).toMatchSnapshot();
  });

  it('renders without error strings', () => {
    const component = render(<Autocomplete data={MockListStrings} autoCalculate />);

    expect(component).toMatchSnapshot();
  });

  it('renders without error objects', () => {
    const component = render(
      <Autocomplete data={MockListObjects} autoCalculate dataId={toId} dataLabel={toLabel} />
    );

    expect(component).toMatchSnapshot();
  });
});
