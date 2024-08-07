import * as React from 'react';
import { MainContainer } from '../../../styles/Main';
import { LoaderAnimation } from '../../ui/LoaderAnimation';
import { Autocomplete } from '../../ui/Autocomplete';

export const CitiesScreen: React.FC = () => {
  return (
    <MainContainer>
      <h1>Static Data: Cities</h1>
      <Autocomplete />
      <LoaderAnimation />
    </MainContainer>
  );
};
