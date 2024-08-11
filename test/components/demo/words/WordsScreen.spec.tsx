import { WordsScreen } from '../../../../src/components/demo/words/WordsScreen';
import { ApiService } from '../../../../src/services/ApiServise';
import { MockListStrings } from '../../../__mock__/mock';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';

jest.mock('../../../../src/services/ApiServise');

describe('WordsScreen', () => {
  it('renders without error', () => {
    ApiService.searchNames = jest.fn(() => Promise.reject('Error'));
    ApiService.initialSearch = jest.fn(() => Promise.resolve(MockListStrings)) as any;
    const component = render(<WordsScreen />);

    expect(component).toMatchSnapshot();
  });

  it('renders when ApiService returns error', () => {
    ApiService.searchNames = jest.fn(() => Promise.reject('Error'));
    ApiService.initialSearch = jest.fn(() => Promise.resolve(MockListStrings)) as any;
    const component = render(<WordsScreen />);

    expect(component).toMatchSnapshot();
  });
});
