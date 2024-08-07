import * as React from 'react';
import { MainContainer } from '../../../styles/Main';
import { LoaderAnimation } from '../../ui/LoaderAnimation';
import { Autocomplete } from '../../ui/Autocomplete';

export const WordsScreen: React.FC = () => {
  return (
    <MainContainer>
      <h1>Dynamic Data: Words</h1>
      <Autocomplete />
      <LoaderAnimation />
    </MainContainer>
  );
};
