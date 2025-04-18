//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Row, type Table as TableType } from "@tanstack/table-core";
import { isBoolean } from "es-toolkit";
import { type ReactNode } from "react";
import {
  Async,
  type AsyncProps,
  type FullEmptyProps,
} from "@/components/Async/Async";
import {
  DataTableTableView,
  type DataTableTableViewSpecificProps,
} from "@/components/DataTable/DataTableTableView";
import { cn } from "@/utils/className";
import { ensureString, isObject } from "@/utils/misc";
import { useDataTable, type UseDataTableProps } from "./DataTable.utils";
import { DataTablePagination } from "./DataTablePagination";
import { GlobalFilterInput } from "./GlobalFilterInput";

export type DataTableViewProps<Data> = {
  table: TableType<Data>;
  rows: Array<Row<Data>>;
} & Pick<DataTableProps<Data>, "entityName">;

type ViewRenderProp<Data> = (props: DataTableViewProps<Data>) => ReactNode;

export interface DataTableProps<Data>
  extends UseDataTableProps<Data>,
    Pick<AsyncProps, "error" | "loading"> {
  className?: string;
  /**
   * Name of the presented data entity
   * Used inside empty states, placeholders
   * Provide pluralized and lowercased
   * @example "users"
   * */
  entityName?: string;
  header?: ReactNode | ViewRenderProp<Data>;
  /**
   * Render props pattern to define different type of views than standard DataTableView
   * */
  children?: ViewRenderProp<Data>;
  bordered?: boolean;
  /**
   * Hides DataTable features, like header or pagination if not required
   * */
  minimal?: boolean;
  tableView?: DataTableTableViewSpecificProps<Data>;
  empty?: boolean | Partial<FullEmptyProps>;
}

export const DataTable = <Data,>({
  className,
  columns,
  entityName,
  data,
  pageSize,
  header,
  children,
  bordered = true,
  minimal,
  tableView,
  loading = false,
  error = false,
  empty,
  ...props
}: DataTableProps<Data>) => {
  const { table, setGlobalFilterDebounced } = useDataTable({
    data,
    columns,
    pageSize,
    ...props,
  });
  const rows = table.getRowModel().rows;

  const isEmpty = !rows.length;
  const viewProps = { table, entityName, rows };

  const defaultEmptyProps = {
    show: rows.length === 0,
    textFilter: ensureString(table.getState().globalFilter),
    hasFilters: data.length !== 0 && table.getState().columnFilters.length > 0,
  };

  return (
    <div
      className={cn(
        "bg-surface-primary rounded-md",
        bordered && "border",
        className,
      )}
    >
      {!minimal && (
        <header className="flex items-center border-b p-4">
          <GlobalFilterInput
            onChange={(event) => setGlobalFilterDebounced(event.target.value)}
            entityName={entityName}
          />
          {typeof header === "function" ? header(viewProps) : header}
        </header>
      )}
      <Async
        error={error}
        loading={loading}
        entityName={entityName}
        empty={
          isObject(empty) ? { ...defaultEmptyProps, ...empty }
          : isBoolean(empty) ?
            empty
          : defaultEmptyProps
        }
      >
        {children ?
          children(viewProps)
        : <DataTableTableView {...tableView} {...viewProps} />}
      </Async>
      {(!minimal || table.getPageCount() > 1) && !isEmpty && (
        <footer className="flex items-center justify-between border-t p-4">
          <DataTablePagination table={table} />
        </footer>
      )}
    </div>
  );
};
