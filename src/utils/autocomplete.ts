import type { DataArrayType } from '../hooks/autocomplete/useDataShow';
import type { DictionaryItem, ItemID } from '../models/Autocomplete';

export const eq = <T>(a: T): T => a;

export const defaultLabelId = <T>(item: T): string => {
  return (item as any).toString();
};

export const convertToShow = <T>(
  items: DataArrayType<T>,
  dataId: (item: T) => ItemID = defaultLabelId,
  dataLabel: (item: T) => string = defaultLabelId,
  max: number = 5
): DictionaryItem<T>[] =>
  items
    .slice(0, max)
    .map((item) => ({ itemData: item, itemToShow: { id: dataId(item), label: dataLabel(item) } }));
