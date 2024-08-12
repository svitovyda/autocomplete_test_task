/* eslint-disable react/prop-types */
import type { DataArrayType } from '../../../hooks/autocomplete/useDataShow';
import type { DictionaryItem } from '../../../models/Autocomplete';
import {
  DropDownContainer,
  DropdownItem,
  DropdownList,
  DropdownListContainer,
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
  loading?: boolean;
  LoadingAnimation?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

export const DropDown = React.memo(
  React.forwardRef<HTMLDivElement, DropdownProps<any>>(
    <T,>(
      {
        items,
        query,
        caseSensitive = false,
        onSelectItem,
        loading,
        LoadingAnimation,
      }: DropdownProps<T>,
      ref: React.ForwardedRef<HTMLDivElement>
    ) => {
      return (
        <DropDownContainer ref={ref}>
          <DropdownListContainer>
            {loading ? (
              LoadingAnimation ? (
                <LoadingAnimation />
              ) : (
                <div>...</div>
              )
            ) : (
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
            )}
          </DropdownListContainer>
        </DropDownContainer>
      );
    }
  ),
  (prevProps: DropdownProps<any>, nextProps: DropdownProps<any>) => {
    const {
      onSelectItem: prevOnSelectItem,
      LoadingAnimation: prevLoadingAnimation,
      ...prevRest
    } = prevProps;
    const {
      onSelectItem: nextOnSelectItem,
      LoadingAnimation: nextLoadingAnimation,
      ...nextRest
    } = nextProps;
    return (
      _.isEqual(prevRest, nextRest) &&
      prevOnSelectItem === nextOnSelectItem &&
      prevLoadingAnimation === nextLoadingAnimation
    );
  }
);

DropDown.displayName = 'DropDown';
