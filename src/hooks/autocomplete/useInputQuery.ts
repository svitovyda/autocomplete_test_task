import type { QueryType } from '../../utils/textSearch';
import debounce from 'debounce';
import * as React from 'react';

type InputQueryActionType =
  | 'INPUT_CHANGED' // user edits the value
  | 'QUERY_DEBOUNCED'; // debounced value dispatched

export interface InputQueryState {
  input: string;
  query: QueryType;
}

type InputQueryPayload = Partial<InputQueryState>;

interface InputQueryAction {
  type: InputQueryActionType;
  payload: InputQueryPayload;
}

export const initialInputQueryState: InputQueryState = {
  input: '',
  query: undefined,
};

const inputStateReducer = (state: InputQueryState, action: InputQueryAction): InputQueryState => {
  switch (action.type) {
    case 'INPUT_CHANGED':
      if (state.input !== action.payload.input) {
        return { ...state, input: action.payload.input || '' };
      }
      return state;

    case 'QUERY_DEBOUNCED':
      if (state.query !== action.payload.query) {
        return { ...state, query: action.payload.query, input: action.payload.input || '' };
      }
      return state;

    default:
      throw new Error();
  }
};

export const useInputQuery = (
  debounceInterval: number = 600,
  minAcceptableLength: number = 2
): [
  InputQueryState,
  React.Dispatch<React.SetStateAction<string>>,
  // React.Dispatch<React.SetStateAction<QueryType>>,
] => {
  const [input, setInput] = React.useState<string>(''); // current state of the input

  const [state, dispatch] = React.useReducer(inputStateReducer, initialInputQueryState);

  // eslint doesn't know how to work with debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchQuery = React.useCallback(
    debounce((value: string) => {
      dispatch({
        type: 'QUERY_DEBOUNCED',
        payload: { query: value, input: value },
      });
    }, debounceInterval),
    [dispatch]
  );

  React.useEffect(() => {
    if (!input || input.length >= minAcceptableLength) {
      updateSearchQuery(input);
    }
    dispatch({ type: 'INPUT_CHANGED', payload: { input } });
  }, [input, minAcceptableLength, updateSearchQuery]);

  return [state, setInput];
};
