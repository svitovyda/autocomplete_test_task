import { useDataInputManager } from '../../hooks/dataInputQueryManager';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SelectContainer } from '../../styles/ui/Autocomplete';
import * as React from 'react';

export type ItemID = string | number;

export interface ShowItem {
  id: ItemID;
  label: string;
}

export interface AutocompleteProps<T> {
  onQueryChanged?: (query: string) => void;
  onItemSelected?: (item: T | undefined) => void;
  minAcceptableLength?: number;
  debounceInterval?: number;
  placeholder?: string;
  maxOptionsToShow?: number;
  initialQuery?: string;
  autoCalculate?: boolean;
  data: T[];
  dataLabel?: (item: T) => string;
  dataId?: (item: T) => ItemID;
  caseSensitive?: boolean;
  showInitOnEmptyInput?: boolean;
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
  placeholder = '',
  maxOptionsToShow = 5,
  initialQuery = '',
  autoCalculate,
  data,
  dataLabel,
  dataId,
  caseSensitive = false,
  showInitOnEmptyInput = true,
}: AutocompleteProps<T>) => {
  const [dataInputState, setInput, setSelectedItemId] = useDataInputManager(
    data,
    debounceInterval,
    minAcceptableLength,
    autoCalculate,
    dataLabel,
    dataId,
    caseSensitive,
    showInitOnEmptyInput,
    maxOptionsToShow
  );

  const [showDropDown, setShowDropDown] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const selectRef = React.useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    onItemSelected?.(dataInputState.selectedItem?.itemData);
    if (dataInputState.selectedItem) {
      setInput(dataInputState.selectedItem?.itemToShow.label);
    }
  }, [dataInputState.selectedItem, onItemSelected, setInput]);

  React.useEffect(() => {
    onQueryChanged?.(dataInputState.query);
  }, [dataInputState.query, onQueryChanged]);

  React.useEffect(() => {
    setInput(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFocusIn = React.useCallback(() => {
    // show drop-out, data to show have to be set in `handleChange`
    setShowDropDown(true);
    if (inputRef.current && dataInputState.input) {
      inputRef.current.setSelectionRange(0, dataInputState.input.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectRef?.current, inputRef?.current, dataInputState.input, dataInputState.itemsToShow]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInput(value);
    },
    [setInput]
  );

  const onClickOutside = React.useCallback(() => {
    setShowDropDown(false);
  }, []);

  useClickOutside([selectRef, inputRef], onClickOutside);

  const onSelectItem = React.useCallback(
    (id: ItemID) => {
      setSelectedItemId(id);
      setShowDropDown(false);
    },
    [setSelectedItemId]
  );

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={dataInputState.input}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={onFocusIn}
      />
      <SelectContainer>
        {showDropDown && dataInputState.itemsToShow.length > 0 && (
          <select
            ref={selectRef}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSelectItem(e.target.value)}
            size={Math.max(dataInputState.itemsToShow.length, 2)} // with only one item the select height gets too small and behaves weird
          >
            {dataInputState.itemsToShow.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        )}
      </SelectContainer>
    </>
  );
};
