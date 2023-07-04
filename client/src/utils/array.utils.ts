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
  item: T,
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

  modifiedItems.splice(index, 0, {
    ...item,
    index,
  });

  return modifiedItems;
}

export function removeIndexValue<T extends { index: number }>(
  items: T[],
  index: number
): T[] {
  const modifiedItems = [...items];
  const removeIndex = modifiedItems.findIndex((item) => item.index === index);
  modifiedItems.splice(removeIndex, 1);

  for (let i = index + 1; i <= items.length - 1; i++) {
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

  return modifiedItems;
}
