export const filterData = <T>(
  data: ReadonlyArray<T> | T[],
  query: string,
  caseSensitive: boolean,
  label: (item: T) => string
): T[] => {
  if (query === '') {
    return [...data];
  }

  const caseQuery = caseSensitive ? query : query.toLowerCase();

  return data.filter((item) => {
    if (caseSensitive) {
      return label(item).includes(query);
    } else {
      return label(item).toLowerCase().includes(caseQuery);
    }
  });
};
