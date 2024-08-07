export const filterData = (data: ReadonlyArray<string> | string[], query: string, caseSensitive: boolean): string[] => {
  if (query === '') {
    return [...data];
  }

  return data.filter((item) => {
    if (caseSensitive) {
      return item.includes(query);
    } else {
      return item.toLowerCase().includes(query.toLowerCase());
    }
  });
};
