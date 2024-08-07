import { MainContainer } from '../styles/Main';
import { Autocomplete } from './ui/Autocomplete';
import { LoaderAnimation } from './ui/LoaderAnimation';
import * as React from 'react';

export const Main: React.FC = () => {
  return (
    <>
      <MainContainer>
        <h1>Static Data: Map</h1>
        <Autocomplete />
        <LoaderAnimation />
      </MainContainer>
      <MainContainer>
        <h1>Dynamic Data: Words</h1>
        <Autocomplete />
        <LoaderAnimation />
      </MainContainer>
    </>
  );
};
