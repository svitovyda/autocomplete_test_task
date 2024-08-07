import { ApiService } from '../services/ApiServise';
import * as React from 'react';

type FetchActionType =
  | 'FETCH_IDLE' // nothing happening, waiting for any imput change
  | 'FETCH_INIT' // start loading initial data
  | 'FETCH_SEARCH' // start loading search by query data
  | 'FETCH_SUCCESS' // loading (init or search) has finished successfully
  | 'FETCH_FAILURE'; // loading (init or search) has finished with failure

export interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T[];
}

interface FetchAction<T> {
  type: FetchActionType;
  payload?: T[];
}

const dataFetchReducer = <T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> => {
  switch (action.type) {
    case 'FETCH_IDLE':
      return { ...state, isLoading: false, isError: false };
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SEARCH':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, data: action.payload || [] };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

export const useContentFetcher = <T>(
  initialQuery: string | undefined
): [FetchState<T>, React.Dispatch<React.SetStateAction<string>>] => {
  const [query, setQuery] = React.useState<string | undefined>(initialQuery);

  const [state, dispatch] = React.useReducer(dataFetchReducer<T>, { isLoading: false, isError: false, data: [] });

  React.useEffect(() => {
    var didUnmount = false;

    const fetchData = async () => {
      if (query === undefined) {
        dispatch({ type: 'FETCH_IDLE' });
      } else if (query === '') {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await ApiService.initialSearch<T>();
          if (!didUnmount) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
          }
        } catch (error) {
          if (!didUnmount) {
            dispatch({ type: 'FETCH_FAILURE' });
          }
        }
      } else if (query.length > 0) {
        dispatch({ type: 'FETCH_SEARCH' });

        try {
          const result = await ApiService.searchNames<T>(query);
          if (!didUnmount) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
          }
        } catch (error) {
          if (!didUnmount) {
            dispatch({ type: 'FETCH_FAILURE' });
          }
        }
      }
    };

    fetchData();

    return () => {
      didUnmount = true;
    };
  }, [query]);

  return [state, setQuery];
};
