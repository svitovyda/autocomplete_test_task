import debounce from 'debounce';
import * as React from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} />;
};

export interface AutocompleteProps<T> {
  onQueryChanged?: (query: string) => void;
  onItemSelected?: (item: T) => void;
  minAcceptableLength?: number;
  debounceInterval?: number;
  InputComponent?: React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;
  placeholder?: string;
  maxOptionsToShow?: number;
  autoCalculate?: boolean;
  data: T[];
  dataLabel?: (item: T) => string;
  dataId?: (item: T) => string | number;
}
/*
 * This component renders input with autocompletion
 * It can be in two modes:
 * - autoCalculate ("static")
 *   it gets all the data once and then as user interacts, searches through this given data
 * - "dynamic"
 *   it assumes that all the calculations with data search by query happen outside of the component,
 *   and it just renders data
 */
export const Autocomplete = <T,>({
  onQueryChanged,
  onItemSelected,
  minAcceptableLength = 3,
  debounceInterval = 3,
  InputComponent = Input,
  placeholder = '',
  maxOptionsToShow = 5,
  autoCalculate,
  data,
  dataLabel = (item: T) => (item as any).toString(),
  dataId = (item: T) => (item as any).toString(),
}: AutocompleteProps<T>): JSX.Element => {
  const [input, setInput] = React.useState(''); // current state of the input
  const [query, setQuery] = React.useState(''); // deboused query
  const [labelsToShow, setLabelsToShow] = React.useState<string[]>([]);

  const onFocusIn = React.useCallback(() => {
    // show drop-out, data to show have to be set in `handleChange`
  }, []);

  const onFocusOut = React.useCallback(() => {
    // hide drop-out, do not clear query (?)
    setLabelsToShow([]);
  }, []);

  // eslint doesn't know how to work with debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchQuery = React.useCallback(
    debounce((value: string) => {
      if (value.length >= minAcceptableLength) {
        onQueryChanged?.(value);
        setQuery(value);
        // set data
      }
    }, debounceInterval),
    [onQueryChanged, minAcceptableLength, debounceInterval]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInput(value);
      updateSearchQuery(value);
    },
    [setInput, updateSearchQuery]
  );

  // to prevent compilation error, TODO: remove!
  console.log(onItemSelected, maxOptionsToShow);

  return (
    <InputComponent
      type="text"
      value={input}
      onChange={handleChange}
      placeholder={placeholder}
      onBlur={onFocusOut}
      onFocus={onFocusIn}
    />
  );
};
