export function updateIndexValues<T extends { index: number }>(
  items: T[],
  oldIndex: number,
  newIndex: number
): T[] {
  const modifiedItems = [...items];

  if (oldIndex < newIndex) {
    for (let i = oldIndex + 1; i <= newIndex; i++) {
      const itemToUpdate = modifiedItems.find((item) => item.index === i);
      if (itemToUpdate) {
        itemToUpdate.index--;
      }
    }
  } else if (oldIndex > newIndex) {
    for (let i = oldIndex - 1; i >= newIndex; i--) {
      const itemToUpdate = modifiedItems.find((item) => item.index === i);
      if (itemToUpdate) {
        itemToUpdate.index++;
      }
    }
  }

  return modifiedItems;
}
