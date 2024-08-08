import { InputContainer } from '../../../styles/Input';
import { MainContainer } from '../../../styles/Main';
import { Autocomplete } from '../../ui/Autocomplete';
import { LoaderAnimation } from '../../ui/LoaderAnimation';
import configJson from 'config';
import * as React from 'react';

export const WordsScreen: React.FC = () => {
  return (
    <MainContainer>
      <h1>Dynamic Data: Words</h1>
      <InputContainer>
        <Autocomplete
          debounceInterval={configJson.searchInputDebounse}
          minAcceptableLength={configJson.minimumSearchQueryLength}
          placeholder="Start typing to find words..."
          data={[]}
        />
      </InputContainer>
      <LoaderAnimation />
    </MainContainer>
  );
};
