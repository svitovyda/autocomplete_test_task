import { MainContainer } from '../styles/Main';
import { LoaderAnimation } from './ui/LoaderAnimation';
import * as React from 'react';

export const Main: React.FC = () => {
  return (
    <MainContainer>
      <LoaderAnimation />
    </MainContainer>
  );
};
