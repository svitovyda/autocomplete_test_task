export type ItemID = string | number;

export interface ShowItem {
  id: ItemID;
  label: string;
}

export interface DictionaryItem<T> {
  itemToShow: ShowItem;
  itemData: T;
}
