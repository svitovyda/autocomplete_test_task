import { type FetchState, useContentFetcher } from '../../../hooks/contentFetcher';
import { InputContainer } from '../../../styles/Input';
import { MainContainer } from '../../../styles/Main';
import { LoaderAnimation } from '../../ui/LoaderAnimation';
import { Autocomplete } from '../../ui/autocomplete/Autocomplete';
import configJson from 'config';
import * as React from 'react';

export const WordsScreen: React.FC = React.memo(() => {
  const [fetchState, setQuery] = useContentFetcher<FetchState<string>>('');
  const [selectedWord, setSelectedWord] = React.useState<string>('');

  const onNewQuery = React.useCallback(
    (newQuery: string) => {
      if (newQuery !== fetchState.query) {
        setQuery(newQuery);
      }
    },
    [setQuery, fetchState]
  );

  return (
    <MainContainer>
      <h1>Dynamic Data: Words</h1>
      <InputContainer>
        <Autocomplete
          debounceInterval={configJson.searchInputDebounse}
          minAcceptableLength={configJson.minimumSearchQueryLength}
          placeholder="Start typing to find words..."
          data={fetchState.data}
          onQueryChanged={onNewQuery}
          onItemSelected={(item) => (item ? setSelectedWord(item.toString()) : '')}
          maxOptionsToShow={6}
          loading={fetchState.isLoading}
          LoadingAnimation={LoaderAnimation}
          keepDropDownOnSelect
        />
      </InputContainer>
      {selectedWord && <MainContainer>You found a word: {selectedWord}</MainContainer>}
    </MainContainer>
  );
});

WordsScreen.displayName = 'WordsScreen';
