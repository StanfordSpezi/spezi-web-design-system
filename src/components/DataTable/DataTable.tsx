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
  /**
   * Additional CSS classes to apply to the DataTable container.
   */
  className?: string;
  /**
   * Name of the presented data entity.
   * Used inside empty states, placeholders.
   * Provide pluralized and lowercased.
   * @example "users"
   */
  entityName?: string;
  /**
   * Slot or render function to add new elements to the DataTable's header.
   * Useful for creating custom filter or action buttons.
   *
   * @example
   * // Using ReactNode
   * header={<Button>Add User</Button>}
   *
   * @example
   * // Using render function
   * header={({ table }) => (
   *   <Button onClick={() => table.resetGlobalFilter()}>
   *     Clear Filters
   *   </Button>
   * )}
   */
  header?: ReactNode | ViewRenderProp<Data>;
  /**
   * Render props pattern to define a different type of views than standard TableView.
   * Useful when creating list-like or grid-like views
   * that still need to support pagination, filtering, and sorting features of DataTable.
   *
   * @example
   * {({ rows }) => (
   *   <div>
   *     {rows.map((row) => {
   *       const person = row.original;
   *       return (
   *         <div key={row.id}>
   *           {person.name}
   *         </div>
   *       );
   *     })}
   *   </div>
   * )}
   */
  children?: ViewRenderProp<Data>;
  /**
   * Renders a border around container.
   * @default true
   */
  bordered?: boolean;
  /**
   * Hides DataTable features, like header or pagination if not required.
   * Useful for simpler views where advanced features are not needed.
   * @default false
   */
  minimal?: boolean;
  /**
   * Properties that are specific to the Table view of DataTable.
   * These properties are only used when the default table view is rendered.
   */
  tableView?: DataTableTableViewSpecificProps<Data>;
  /**
   * Custom empty state handler. It's an optional property unless custom behavior is needed.
   * Can be a boolean to show/hide the default empty state, or an object to customize it.
   *
   * @example
   * // customized error message
   * empty={{ children: "Sorry, no users found" }}
   *
   * @example
   * // disable empty state
   * empty={false}
   */
  empty?: boolean | Partial<FullEmptyProps>;
}

/**
 * A flexible DataTable component that supports pagination, filtering, and sorting.
 *
 * This component heavily relies most of it's properties and API on [@tanstack/react-table](https://www.npmjs.com/package/@tanstack/react-table).
 * Please refer to the [docs](https://tanstack.com/table/v8/docs/introduction) for more details and advanced usage.
 *
 * Features:
 * - Global text search filtering
 * - Column-based filtering and sorting
 * - Pagination with configurable page size
 * - Customizable empty states and loading states
 * - Multiple view modes - table by default, any other by customizing props
 * - Extensible header
 *
 * @template Data - The type of data items displayed in the table
 *
 * @example
 * // Basic usage with array of users
 * const userColumns = createColumnHelper<User>()
 * <DataTable
 *   data={users}
 *   columns={[
 *     userColumns.accessor('name', { header: 'Name' }),
 *     userColumns.accessor('email', { header: 'Email' }),
 *     userColumns.accessor('role', { header: 'Role' })
 *   ]}
 *   entityName="users"
 *   pageSize={10}
 * />
 *
 * @example
 * // With custom empty state and loading
 * const productColumns = createColumnHelper<Product>()
 * <DataTable
 *   data={products}
 *   columns={[
 *     productColumns.accessor('name', { header: 'Product Name' }),
 *     productColumns.accessor('price', { header: 'Price' }),
 *     productColumns.accessor('category', { header: 'Category' })
 *   ]}
 *   entityName="products"
 *   loading={isLoading}
 *   error={error}
 *   empty={{ children: "No products found" }}
 * />
 *
 *
 * @example
 * // Completely custom view
 * <DataTable<Person>
 *   columns={peopleColumns}
 *   data={peopleData}
 *   entityName="users"
 *   className="m-5"
 * >
 *   {({ rows }) => (
 *     <div>
 *       {rows.map((row) => {
 *         const person = row.original;
 *         return (
 *           <div key={row.id}>
 *             <h4>{person.name}</h4>
 *             <span>
 *               {person.age} years old
 *             </span>
 *           </div>
 *         );
 *       })}
 *     </div>
 *   )}
 * </DataTable>
 */
export const DataTable = <Data,>({
  className,
  columns,
  entityName,
  data,
  pageSize,
  header,
  children,
  bordered = true,
  minimal = false,
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
