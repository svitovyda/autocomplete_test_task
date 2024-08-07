import { CitiesScreen } from './components/demo/cities/CitiesScreen';
import { WordsScreen } from './components/demo/words/WordsScreen';
import { MainContainer } from './styles/Main';
import { GlobalStyle } from './styles/global';
import * as React from 'react';

export const App: React.FC<{}> = () => {
  return (
    <MainContainer>
      <CitiesScreen />
      <WordsScreen />
      <GlobalStyle />
    </MainContainer>
  );
};
