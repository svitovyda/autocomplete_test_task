import { CitiesScreen } from './components/demo/cities/CitiesScreen';
import { GlobalStyle } from './styles/global';
import * as React from 'react';
import { MainContainer } from './styles/Main';
import { WordsScreen } from './components/demo/words/WordsScreen';

export const App: React.FC<{}> = () => {
  return (
    <MainContainer>
      <CitiesScreen />
      <WordsScreen />
      <GlobalStyle />
    </MainContainer>
  );
};
