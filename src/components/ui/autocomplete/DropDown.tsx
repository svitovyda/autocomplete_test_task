/* eslint-disable react/prop-types */
import type { DataArrayType } from '../../../hooks/autocomplete/useDataShow';
import type { DictionaryItem } from '../../../models/Autocomplete';
import {
  DropDownContainer,
  DropdownItem,
  DropdownList,
} from '../../../styles/ui/autocomplete/DropDown';
import type { QueryType } from '../../../utils/textSearch';
import { HighlightedText } from './HighlightedText';
import _ from 'lodash';
import React from 'react';

interface DropdownProps<T> {
  items: DataArrayType<DictionaryItem<T>>;
  query?: QueryType;
  caseSensitive?: boolean;
  onSelectItem: (item: DictionaryItem<T>) => void;
}

export const DropDown = React.memo(
  React.forwardRef<HTMLDivElement, DropdownProps<any>>(
    <T,>(
      { items, query, caseSensitive = false, onSelectItem }: DropdownProps<T>,
      ref: React.ForwardedRef<HTMLDivElement>
    ) => {
      return (
        <DropDownContainer ref={ref}>
          <DropdownList>
            {items.map((item) => (
              <DropdownItem key={item.itemToShow.id} onClick={() => onSelectItem(item)}>
                <HighlightedText
                  text={item.itemToShow.label}
                  query={query}
                  caseSensitive={caseSensitive}
                />
              </DropdownItem>
            ))}
          </DropdownList>
        </DropDownContainer>
      );
    }
  ),
  _.isEqual
);

DropDown.displayName = 'DropDown';
