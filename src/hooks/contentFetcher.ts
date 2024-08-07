import { ApiService } from '../services/ApiServise';
import * as React from 'react';

type FetchActionType = 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';

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
    case 'FETCH_INIT':
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
  initialQuery: string
): [FetchState<T>, React.Dispatch<React.SetStateAction<string>>] => {
  const [query, setQuery] = React.useState<string>(initialQuery);

  const [state, dispatch] = React.useReducer(dataFetchReducer<T>, { isLoading: false, isError: false, data: [] });

  React.useEffect(() => {
    var didUnmount = false;

    const fetchData = async () => {
      if (query.length > 0) {
        dispatch({ type: 'FETCH_INIT' });

        try {
          const result = await ApiService.searchNames(query);
          if (!didUnmount) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result as T[] });
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
