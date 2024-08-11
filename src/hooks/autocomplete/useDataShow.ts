import type { DictionaryItem, ItemID } from '../../models/Autocomplete';
import { convertToShow, defaultLabelId } from '../../utils/autocomplete';
import { type QueryType, filterData } from '../../utils/textSearch';
import _ from 'lodash';
import * as React from 'react';

export type DataArrayType<T> = T[] | ReadonlyArray<T>;

interface PropsToCompare<T> {
  data: DataArrayType<T>;
  maxOptionsToShow: number;
  autoCalculate: boolean;
  caseSensitive: boolean;
  query: QueryType;
}

const recalculateDataShow = <T>(
  data: DataArrayType<T>,
  dataLabel: (item: T) => string,
  dataId: (item: T) => ItemID,
  maxOptionsToShow: number,
  autoCalculate: boolean,
  caseSensitive: boolean,
  query: QueryType
): DictionaryItem<T>[] => {
  if (autoCalculate && query) {
    return convertToShow<T>(
      filterData(data, query, caseSensitive, dataLabel),
      dataId,
      dataLabel,
      maxOptionsToShow
    );
  }
  return convertToShow<T>(data, dataId, dataLabel, maxOptionsToShow);
};

export const useDataShow = <T>(
  data: DataArrayType<T>,
  dataLabel: (item: T) => string = defaultLabelId,
  dataId: (item: T) => ItemID = defaultLabelId,
  maxOptionsToShow: number = 5,
  autoCalculate: boolean = false,
  caseSensitive: boolean = false, // gets used only if autoCalculate=true
  query: QueryType = undefined // gets used only if autoCalculate=true
): DictionaryItem<T>[] => {
  const prevProps = React.useRef<PropsToCompare<T>>({
    data: [],
    maxOptionsToShow,
    autoCalculate,
    caseSensitive,
    query,
  });

  const [itemsToShow, setItemsToShow] = React.useState<DictionaryItem<T>[]>([]);

  React.useEffect(() => {
    const props: PropsToCompare<T> = {
      data,
      maxOptionsToShow,
      autoCalculate,
      caseSensitive,
      query,
    };

    if (!_.isEqual(prevProps.current, props)) {
      prevProps.current = props;

      setItemsToShow(
        recalculateDataShow<T>(
          data,
          dataLabel,
          dataId,
          maxOptionsToShow,
          autoCalculate,
          caseSensitive,
          query
        )
      );
    }
  }, [query, data, dataLabel, dataId, maxOptionsToShow, autoCalculate, caseSensitive, prevProps]);

  return itemsToShow;
};
