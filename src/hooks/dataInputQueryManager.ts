import { filterData } from '../utils/textSearch';
import debounce from 'debounce';
import * as React from 'react';

const defaultLabelId = <T>(item: T): string => {
  return (item as any).toString();
};

export const convertToShow = <T>(
  items: T[] | ReadonlyArray<T>,
  dataId: (item: T) => ItemID = defaultLabelId,
  dataLabel: (item: T) => string = defaultLabelId,
  max: number = 5
): ShowItem[] => items.slice(0, max).map((item) => ({ id: dataId(item), label: dataLabel(item) }));

export type ItemID = string | number;

export interface DictionaryItem<T> {
  itemToShow: ShowItem;
  itemData: T;
}

type DictionaryType<T> = { [key: ItemID]: DictionaryItem<T> };

type DataInputActionType =
  | 'INPUT_CHANGED' // user edits the value
  | 'ITEM_SELECTED' // user selected item
  | 'RECALCULATE_SHOW_ITEMS'; // state.query changed

export interface ShowItem {
  id: ItemID;
  label: string;
}

export interface DataInputState<T> {
  input: string;
  query: string;
  itemsToShow: ShowItem[];
  selectedItem: DictionaryItem<T> | undefined;
}

interface DataInputPayload<T> extends Partial<DataInputState<T>> {
  autoCalculate?: boolean;
  dataLabel?: (item: T) => string;
  dataId?: (item: T) => ItemID;
  caseSensitive?: boolean;
  data?: T[] | ReadonlyArray<T>;
  showInitOnEmptyInput?: boolean;
  maxOptionsToShow?: number;
  selectedItemId?: ItemID;
  dictionary?: DictionaryType<T>;
}

interface AutocompleteDataInputAction<T> {
  type: DataInputActionType;
  payload: DataInputPayload<T>;
}

const recalculateShowItems = <T>(
  state: DataInputState<T>,
  payload: DataInputPayload<T>
): DataInputState<T> => {
  const {
    query = '',
    autoCalculate,
    dataLabel = defaultLabelId,
    dataId,
    caseSensitive,
    data = [],
    showInitOnEmptyInput,
    maxOptionsToShow = 5,
  } = payload;
  const newState: DataInputState<T> = { ...state, query, itemsToShow: [] };

  if (!query && !showInitOnEmptyInput) {
    return newState;
  }

  if (autoCalculate) {
    newState.itemsToShow = newState.query
      ? convertToShow(
          filterData(data, newState.query, !!caseSensitive, dataLabel),
          dataId!,
          dataLabel,
          maxOptionsToShow
        )
      : convertToShow(data, dataId!, dataLabel, maxOptionsToShow);
    return newState;
  }

  newState.itemsToShow = convertToShow(data, dataId!, dataLabel, maxOptionsToShow);
  return newState;
};

const recalculateSelectedItem = <T>(
  state: DataInputState<T>,
  payload: DataInputPayload<T>
): DataInputState<T> => {
  const { selectedItemId: id = '', dictionary = {} } = payload;

  const newState: DataInputState<T> = { ...state, selectedItem: undefined };

  if (id !== undefined && id !== '' && dictionary?.[id]) {
    newState.selectedItem = dictionary[id]!;
    return newState;
  }

  return newState;
};

const dataInputQueryReducer = <T>(
  state: DataInputState<T>,
  action: AutocompleteDataInputAction<T>
): DataInputState<T> => {
  switch (action.type) {
    case 'INPUT_CHANGED':
      return { ...state, input: action.payload.input! };
    case 'RECALCULATE_SHOW_ITEMS':
      return recalculateShowItems(state, action.payload);
    case 'ITEM_SELECTED':
      return recalculateSelectedItem(state, action.payload);
    default:
      throw new Error();
  }
};

export const useDataInputManager = <T>(
  data: T[] | ReadonlyArray<T>,
  debounceInterval: number = 600,
  minAcceptableLength: number = 2,
  autoCalculate: boolean = false,
  dataLabel: (item: T) => string = defaultLabelId,
  dataId: (item: T) => ItemID = defaultLabelId,
  caseSensitive: boolean = false,
  showInitOnEmptyInput: boolean = true,
  maxOptionsToShow: number = 5
): [
  DataInputState<T>,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<ItemID>>,
] => {
  const [input, setInput] = React.useState(''); // current state of the input

  const [selectedItemId, setSelectedItemId] = React.useState<ItemID | undefined>(undefined);

  const dictionary: DictionaryType<T> = React.useMemo(() => {
    const res: DictionaryType<T> = {};

    data.forEach((item: T) => {
      const id: ItemID = dataId(item);
      const label: string = dataLabel(item);
      const dictionaryItem: DictionaryItem<T> = {
        itemToShow: { id, label },
        itemData: item,
      };
      res[id] = dictionaryItem;
    });
    return res;
  }, [data, dataId, dataLabel]);

  const [state, dispatch] = React.useReducer(dataInputQueryReducer, {
    input: '',
    query: '',
    itemsToShow: [],
    selectedItem: undefined,
  });

  // eslint doesn't know how to work with debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchQuery = React.useCallback(
    // state is not yet updated with the latest input value!
    debounce((value: string) => {
      if (state.query !== value) {
        if (value.length >= minAcceptableLength || !value) {
          dispatch({
            type: 'RECALCULATE_SHOW_ITEMS',
            payload: {
              query: value,
              input: value,
              data,
              autoCalculate,
              dataLabel,
              dataId,
              caseSensitive,
              showInitOnEmptyInput,
              maxOptionsToShow,
            },
          });
        }
      }
    }, debounceInterval),
    [
      state,
      minAcceptableLength,
      data,
      autoCalculate,
      dataLabel,
      dataId,
      caseSensitive,
      showInitOnEmptyInput,
      maxOptionsToShow,
    ]
  );

  React.useEffect(() => {
    if (input.length >= minAcceptableLength || !input) {
      dispatch({
        type: 'RECALCULATE_SHOW_ITEMS',
        payload: {
          query: input,
          data,
          autoCalculate,
          dataLabel,
          dataId,
          caseSensitive,
          showInitOnEmptyInput,
          maxOptionsToShow,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (state.input !== input) {
      updateSearchQuery(input);
      // dispatch must be after updateSearchQuery!
      dispatch({ type: 'INPUT_CHANGED', payload: { input } });
    }
  }, [input, state, updateSearchQuery]);

  React.useEffect(() => {
    if (state.selectedItem?.itemToShow.id !== selectedItemId) {
      dispatch({
        type: 'ITEM_SELECTED',
        payload: {
          selectedItemId,
          dictionary,
          data,
          autoCalculate,
          dataLabel,
          dataId,
          caseSensitive,
          showInitOnEmptyInput,
          maxOptionsToShow,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemId, updateSearchQuery, dictionary]);

  return [state as DataInputState<T>, setInput, setSelectedItemId];
};
