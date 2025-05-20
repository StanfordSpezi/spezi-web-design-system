//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  type FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { TableOptions } from "@tanstack/table-core";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { PartialSome } from "@/utils/misc";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }

  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

/**
 * Default fuzzyFilter implementation, used for global text filtering.
 */
export const fuzzyFilter: FilterFn<unknown> = (
  row,
  columnId,
  filterValue,
  addMeta,
) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue as string);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export interface UseDataTableProps<Data>
  extends PartialSome<TableOptions<Data>, "getCoreRowModel" | "filterFns"> {
  /**
   * Defines how many items are displayed per one page.
   *
   * @default 50
   */
  pageSize?: number;
}

/**
 * Composes useReactTable usage, contains core data table logic.
 */
export const useDataTable = <Data>({
  columns,
  data,
  pageSize = 50,
  state,
  initialState,
  ...props
}: UseDataTableProps<Data>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const setGlobalFilterDebounced = useDebouncedCallback(
    (value: string) => setGlobalFilter(value),
    200,
  );

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: { globalFilter, ...state },
    initialState: {
      pagination: {
        pageSize,
      },
      ...initialState,
    },
    ...props,
  });

  return { globalFilter, setGlobalFilter, setGlobalFilterDebounced, table };
};
