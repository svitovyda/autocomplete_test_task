import * as React from 'react';
import debounce from 'debounce';

export interface AutocompleteProps<T> {
  onQueryChanged?: (query: string) => void;
  onItemSelected?: (item: T) => void;
  minAcceptableLength?: number;
  debounceInterval?: number;
  placeholder?: string;
  maxOptionsToShow?: number;
}



export const Autocomplete = <T,>({
  onQueryChanged,
  onItemSelected,
  minAcceptableLength = 3,
  debounceInterval = 3,
  placeholder = '',
  maxOptionsToShow = 5,
}: AutocompleteProps<T>): JSX.Element => {
  const [query, setQuery] = React.useState('');

  const onFocusIn = React.useCallback(() => {
    // show drop-out, data to show have to be set in `handleChange`
  }, []);

  const onFocusOut = React.useCallback(() => {
    // hide drop-out, do not clear query (?)
  }, []);

  // eslint doesn't know how to work with debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchQuery = React.useCallback(
    debounce((value: string) => {
      if (value.length >= minAcceptableLength) {
        onQueryChanged?.(value);
        // set data
      }
    }, debounceInterval),
    [onQueryChanged, minAcceptableLength, debounceInterval]
  );

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    updateSearchQuery(value);
  }, [setQuery, updateSearchQuery]);

  // to prevent compilation error, TODO: remove!
  console.log(onItemSelected, maxOptionsToShow);

  return (<input
    type="text"
    value={query}
    onChange={handleChange}
    placeholder={placeholder}
    onBlur={onFocusOut}
    onFocus={onFocusIn}
  />);
};
