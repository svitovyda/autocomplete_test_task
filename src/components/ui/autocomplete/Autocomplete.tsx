import { type DataArrayType, useDataShow } from '../../../hooks/autocomplete/useDataShow';
import { useInputQuery } from '../../../hooks/autocomplete/useInputQuery';
import { useClickOutside } from '../../../hooks/useClickOutside';
import type { DictionaryItem } from '../../../models/Autocomplete';
import { AutocompleteInput } from '../../../styles/ui/autocomplete/Autocomplete';
import { defaultLabelId } from '../../../utils/autocomplete';
import type { QueryType } from '../../../utils/textSearch';
import { DropDown } from './DropDown';
import _ from 'lodash';
import * as React from 'react';

export type ItemID = string | number;

export interface ShowItem {
  id: ItemID;
  label: string;
}

export interface AutocompleteProps<T> {
  onQueryChanged?: (query: QueryType) => void;
  onItemSelected?: (item: T) => void;
  minAcceptableLength?: number;
  debounceInterval?: number;
  placeholder?: string;
  maxOptionsToShow?: number;
  autoCalculate?: boolean;
  data: DataArrayType<T>;
  dataLabel?: (item: T) => string;
  dataId?: (item: T) => ItemID;
  caseSensitive?: boolean;
  showDataOnEmptyInput?: boolean;
  initialInput?: string;
  loading?: boolean;
  LoadingAnimation?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  keepDropDownOnSelect?: boolean;
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
export const Autocomplete = React.memo(
  <T,>({
    onQueryChanged,
    onItemSelected,
    minAcceptableLength = 3,
    debounceInterval = 600,
    placeholder = '',
    maxOptionsToShow = 5,
    autoCalculate,
    data = [],
    dataLabel = defaultLabelId,
    dataId = defaultLabelId,
    caseSensitive = false,
    showDataOnEmptyInput = true,
    initialInput,
    loading,
    LoadingAnimation,
    keepDropDownOnSelect,
  }: AutocompleteProps<T>) => {
    /**
     * If Autocomplete is used to display result of the search that were recalculated outside,
     * `autoCalculate` should be set to false. Then we just always need to convert each item to
     * pair `{id, label}`, and take first `maxOptionsToShow`.
     * So `showInit` should always be `true` when `autoCalculate` is false
     *
     * And only once user clicks on the input or focuses on it, this precalculated pairs should be
     * shown
     *
     * If Autocomplete is using static data and should filter it by itself as user types,
     * `showDataOnEmptyInput` lets us to choose, what to show when user didn't enter the input:
     * no options or just first `maxOptionsToShow` options
     **/

    // const [inputQueryState, setInput, setQuery] = useInputQuery(
    const [inputQueryState, setInput] = useInputQuery(debounceInterval, minAcceptableLength);
    const prevQuery = React.useRef<QueryType>(undefined);

    const [showDropDown, setShowDropDown] = React.useState(false);

    const itemsToShow = useDataShow<T>(
      data,
      dataLabel,
      dataId,
      maxOptionsToShow,
      autoCalculate,
      caseSensitive,
      inputQueryState.query
    );

    const inputRef = React.useRef<HTMLInputElement>(null);
    const dropDownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (initialInput !== undefined) {
        setInput(initialInput || '');
      }
    }, [initialInput, setInput]);

    // listens to the query debounced, to make HTTP call for example
    // it should be called no matter if query changed due to user typing or user selected item,
    // we need to make sure external search result has all the correct data from server
    React.useEffect(() => {
      if (inputQueryState.query !== prevQuery.current) {
        prevQuery.current = inputQueryState.query;
        onQueryChanged?.(inputQueryState.query);
      }
    }, [inputQueryState.query, onQueryChanged]);

    // all the calculations of dataToShow should be made by this moment,
    // only show drop-down and select all tezt in input
    const onFocusIn = React.useCallback(() => {
      if (showDataOnEmptyInput || inputQueryState.input) {
        setShowDropDown(true);
        if (inputRef.current && inputQueryState.input) {
          inputRef.current.setSelectionRange(0, inputQueryState.input.length);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropDownRef?.current, inputRef?.current, inputQueryState.input, itemsToShow]);

    // listens to user typing
    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);
      },
      [setInput]
    );

    // if user clicks outside of this component - close drop-down
    const onClickOutside = React.useCallback(() => {
      setShowDropDown(false);
    }, []);

    useClickOutside([dropDownRef, inputRef], onClickOutside);

    // listens on user selecting the option from drop-down
    const onSelectItem = React.useCallback(
      (item: DictionaryItem<T>) => {
        onItemSelected?.(item.itemData);
        keepDropDownOnSelect && setShowDropDown(false);
        setInput(item.itemToShow.label);
      },
      [onItemSelected, setInput, keepDropDownOnSelect]
    );

    return (
      <>
        <AutocompleteInput
          ref={inputRef}
          type="text"
          value={inputQueryState.input}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={onFocusIn}
        />

        {showDropDown && itemsToShow.length > 0 && (
          <DropDown
            ref={dropDownRef}
            onSelectItem={onSelectItem}
            items={itemsToShow}
            query={inputQueryState.query}
            caseSensitive={caseSensitive}
            loading={loading}
            LoadingAnimation={LoadingAnimation}
          />
        )}
      </>
    );
  },
  (prevProps: AutocompleteProps<any>, nextProps: AutocompleteProps<any>) => {
    const {
      dataLabel: prevDataLabel,
      dataId: prevDataId,
      onItemSelected: onPrevItemSelected,
      onQueryChanged: onPrevQueryChanged,
      ...prevRest
    } = prevProps;
    const {
      dataLabel: nextDataLabel,
      dataId: nextDataId,
      onItemSelected: onNextItemSelected,
      onQueryChanged: onNextQueryChanged,
      ...nextRest
    } = nextProps;
    return (
      _.isEqual(prevRest, nextRest) &&
      prevDataId === nextDataId &&
      prevDataLabel === nextDataLabel &&
      onPrevItemSelected === onNextItemSelected &&
      onPrevQueryChanged === onNextQueryChanged
    );
  }
);

Autocomplete.displayName = 'Autocomplete';
