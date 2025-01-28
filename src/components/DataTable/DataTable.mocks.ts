//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createColumnHelper } from "@tanstack/react-table";

export const peopleData = [
  {
    name: "John",
    age: 52,
    updatedAt: new Date(2019, 1, 12, 23, 31),
  },
  {
    name: "Doe",
    age: 19,
    updatedAt: null,
  },
  {
    name: "Lorem",
    age: 24,
    updatedAt: new Date(2023, 6, 3, 12, 33),
  },
  {
    name: "Anna",
    age: 47,
    updatedAt: new Date(2022, 8, 24, 19, 11),
  },
  {
    name: "Mark",
    age: 18,
    updatedAt: null,
  },
  {
    name: "Ralph",
    age: 12,
    updatedAt: new Date(2016, 3, 7, 4, 17),
  },
  {
    name: "Jasmine",
    age: 34,
    updatedAt: new Date(2024, 0, 9, 3, 58),
  },
];

export type Person = (typeof peopleData)[number];

export const columnHelper = createColumnHelper<Person>();

export const peopleColumn = {
  name: columnHelper.accessor("name", { header: "Name", id: "name" }),
  age: columnHelper.accessor("age", {
    header: "Age",
    id: "age",
    filterFn: "equals",
  }),
};

export const peopleColumns = [peopleColumn.name, peopleColumn.age];
