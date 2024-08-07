import { InputContainer } from '../../../styles/Input';
import { MainContainer } from '../../../styles/Main';
import { Autocomplete } from '../../ui/Autocomplete';
import { LoaderAnimation } from '../../ui/LoaderAnimation';
import * as React from 'react';

export const WordsScreen: React.FC = () => {
  return (
    <MainContainer>
      <h1>Dynamic Data: Words</h1>
      <InputContainer>
        <Autocomplete />
      </InputContainer>
      <LoaderAnimation />
    </MainContainer>
  );
};
