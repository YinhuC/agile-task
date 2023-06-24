export function sortByIndex<T extends { index: number }>(items: T[]): T[] {
  return items.slice().sort((a, b) => {
    return a.index - b.index;
  });
}
