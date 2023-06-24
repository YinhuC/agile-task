import { sortByIndex } from './sort.utils';

export function updateIndexValues<T extends { index: number }>(
  items: T[],
  oldIndex: number,
  newIndex: number
): T[] {
  const modifiedItems = [...items];
  const oldItem = modifiedItems.find((item) => item.index === oldIndex);
  const oldItemIndex = modifiedItems.findIndex(
    (item) => item.index === oldIndex
  );

  if (oldIndex < newIndex) {
    for (let i = oldIndex + 1; i <= newIndex; i++) {
      const itemToUpdateIndex = modifiedItems.findIndex(
        (item) => item.index === i
      );
      if (itemToUpdateIndex !== -1) {
        modifiedItems[itemToUpdateIndex] = {
          ...modifiedItems[itemToUpdateIndex],
          index: i - 1,
        };
      }
    }
  } else if (oldIndex > newIndex) {
    for (let i = oldIndex - 1; i >= newIndex; i--) {
      const itemToUpdateIndex = modifiedItems.findIndex(
        (item) => item.index === i
      );
      if (itemToUpdateIndex !== -1) {
        modifiedItems[itemToUpdateIndex] = {
          ...modifiedItems[itemToUpdateIndex],
          index: i + 1,
        };
      }
    }
  }

  if (oldItem) {
    modifiedItems[oldItemIndex] = {
      ...oldItem,
      index: newIndex,
    };
  }

  return sortByIndex(modifiedItems);
}

export function insertIndexValue<T extends { index: number }>(
  oldItem: T,
  items: T[],
  index: number
): T[] {
  const modifiedItems = [...items];

  for (let i = items.length - 1; i >= index; i--) {
    const itemToUpdateIndex = modifiedItems.findIndex(
      (item) => item.index === i
    );
    if (itemToUpdateIndex !== -1) {
      modifiedItems[itemToUpdateIndex] = {
        ...modifiedItems[itemToUpdateIndex],
        index: i + 1,
      };
    }
  }

  modifiedItems.push({
    ...oldItem,
    index: index,
  });

  return sortByIndex(modifiedItems);
}

export function removeIndexValue<T extends { index: number }>(
  items: T[],
  index: number
): T[] {
  const modifiedItems = [...items];

  for (let i = index + 1; i <= items.length; i++) {
    const itemToUpdateIndex = modifiedItems.findIndex(
      (item) => item.index === i
    );
    if (itemToUpdateIndex !== -1) {
      modifiedItems[itemToUpdateIndex] = {
        ...modifiedItems[itemToUpdateIndex],
        index: i - 1,
      };
    }
  }

  return sortByIndex(modifiedItems);
}
