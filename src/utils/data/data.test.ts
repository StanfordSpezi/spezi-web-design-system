//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { beforeEach, vitest } from "vitest";
import { syncData } from "./data";

describe("syncData", () => {
  interface Data {
    id: string;
    name: string;
  }
  const objects = {
    lorem: { id: "lorem", name: "Lorem" },
    newLorem: { id: "lorem", name: "Lorem New" },
    ipsum: { id: "ipsum", name: "Ipsum" },
  };

  const onCreate = vitest.fn();
  const onDelete = vitest.fn();
  const onUpdate = vitest.fn();

  const runSyncData = (params: { oldItems: Data[]; newItems: Data[] }) => {
    syncData({
      ...params,
      getId: (item) => item.id,
      onDelete,
      onCreate,
      onUpdate,
    });
  };

  beforeEach(() => {
    vitest.resetAllMocks();
  });

  it("calls onCreate when there is new item", () => {
    runSyncData({
      oldItems: [],
      newItems: [objects.lorem],
    });
    expect(onCreate).toHaveBeenCalledExactlyOnceWith(
      objects.lorem.id,
      objects.lorem,
    );
    expect(onDelete).not.toHaveBeenCalled();
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it("calls onDelete when old item is not present in new items", () => {
    runSyncData({
      oldItems: [objects.lorem],
      newItems: [],
    });
    expect(onDelete).toHaveBeenCalledExactlyOnceWith(
      objects.lorem.id,
      objects.lorem,
    );
    expect(onCreate).not.toHaveBeenCalled();
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it("calls onUpdate when there is the same item, but with different fields", () => {
    runSyncData({
      oldItems: [objects.lorem],
      newItems: [objects.newLorem],
    });
    expect(onUpdate).toHaveBeenCalledExactlyOnceWith(
      objects.lorem.id,
      objects.newLorem,
      objects.lorem,
    );
    expect(onCreate).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("doesn't call onUpdate when there is no changes to an item", () => {
    runSyncData({
      oldItems: [objects.lorem],
      newItems: [objects.lorem],
    });
    expect(onUpdate).not.toHaveBeenCalled();
    expect(onCreate).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });
});
