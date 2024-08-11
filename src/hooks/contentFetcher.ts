import { ApiService } from '../services/ApiServise';
import type { DataArrayType } from './autocomplete/useDataShow';
import * as React from 'react';

type FetchActionType =
  | 'START_FETCH_INITIAL' // start loading initial data
  | 'START_FETCH_SEARCH' // start loading search by query data
  | 'FETCH_SUCCESS' // loading (init or search) has finished successfully
  | 'FETCH_FAILURE'; // loading (init or search) has finished with failure

export interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: DataArrayType<T>;
  query?: string;
}

interface FetchAction<T> {
  type: FetchActionType;
  payload?: { result?: T[]; query?: string };
}

const dataFetchReducer = <T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> => {
  switch (action.type) {
    case 'START_FETCH_INITIAL':
      return { ...state, isLoading: true, isError: false, data: [], query: action.payload?.query };
    case 'START_FETCH_SEARCH':
      return { ...state, isLoading: true, isError: false, data: [], query: action.payload?.query };
    case 'FETCH_SUCCESS':
      if (state.query === action.payload?.query) {
        return { ...state, isLoading: false, isError: false, data: action.payload?.result || [] };
      }
      return state;
    case 'FETCH_FAILURE':
      if (state.query === action.payload?.query) {
        return { ...state, isLoading: false, isError: true, data: [] };
      }
      return state;
    default:
      throw new Error();
  }
};

export const useContentFetcher = <T>(
  initialQuery: string | undefined
): [FetchState<T>, React.Dispatch<React.SetStateAction<string>>] => {
  const [query, setQuery] = React.useState<string | undefined>(initialQuery);

  const [state, dispatch] = React.useReducer(dataFetchReducer<T>, {
    isLoading: false,
    isError: false,
    data: [],
    query: undefined,
  });

  React.useEffect(() => {
    var didUnmount = false;

    const fetchData = async () => {
      if (query === undefined) {
        return;
      }
      if (query === '') {
        dispatch({ type: 'START_FETCH_INITIAL', payload: { query } });
        try {
          const result = await ApiService.initialSearch<T>();
          if (!didUnmount) {
            dispatch({ type: 'FETCH_SUCCESS', payload: { result, query } });
          }
        } catch (error) {
          if (!didUnmount) {
            dispatch({ type: 'FETCH_FAILURE' });
          }
        }
      } else if (query.length > 0) {
        dispatch({ type: 'START_FETCH_SEARCH', payload: { query } });

        try {
          const result = await ApiService.searchNames<T>(query);
          if (!didUnmount) {
            dispatch({ type: 'FETCH_SUCCESS', payload: { result, query } });
          }
        } catch (error) {
          if (!didUnmount) {
            dispatch({ type: 'FETCH_FAILURE', payload: { query } });
          }
        }
      }
    };

    if (query === undefined) {
      setQuery('');
    }
    fetchData();

    return () => {
      didUnmount = true;
    };
  }, [query]);

  return [state, setQuery];
};
