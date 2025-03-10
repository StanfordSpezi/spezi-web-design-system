//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isEqual, keyBy, uniq } from "es-toolkit";

/**
 * Compares array of two objects and performs create/delete/update operations.
 * Checks equality for update. By default, uses deep object equality
 * Useful for bulk transaction operations
 * */
export const syncData = <Item>({
  oldItems,
  newItems,
  getId,
  onDelete,
  onCreate,
  onUpdate,
  isEqual: isEqualFunction = isEqual,
}: {
  oldItems: Item[];
  newItems: Item[];
  getId: (item: Item) => string;
  onDelete: (id: string, oldItem: Item) => void;
  onCreate: (id: string, newItem: Item) => void;
  onUpdate: (id: string, newItem: Item, oldItem: Item) => void;
  isEqual?: (oldItem: Item, newItem: Item) => boolean;
}) => {
  const oldItemsRecord = keyBy(oldItems, getId);
  const newItemsRecord = keyBy(newItems, getId);

  const itemsIds = uniq([
    ...Object.keys(oldItemsRecord),
    ...Object.keys(newItemsRecord),
  ]);

  itemsIds.forEach((id) => {
    const oldItem = oldItemsRecord[id];
    const newItem = newItemsRecord[id];

    if (!newItem && oldItem) {
      onDelete(getId(oldItem), oldItem);
    } else if (newItem && !oldItem) {
      onCreate(getId(newItem), newItem);
    } else if (oldItem && newItem && !isEqualFunction(oldItem, newItem)) {
      onUpdate(getId(newItem), newItem, oldItem);
    }
  });
};
