//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Table as TableType } from '@tanstack/table-core'
import { type ReactNode } from 'react'
import {
  DataTableTableView,
  type DataTableTableViewSpecificProps,
} from '@/components/DataTable/DataTableTableView'
import { useDataTable, type UseDataTableProps } from './DataTable.utils'
import { DataTablePagination } from './DataTablePagination'
import { GlobalFilterInput } from './GlobalFilterInput'
import { cn } from '../../utils/className'

export type DataTableViewProps<Data> = { table: TableType<Data> } & Pick<
  DataTableProps<Data>,
  'entityName'
>

type ViewRenderProp<Data> = (props: DataTableViewProps<Data>) => ReactNode

export interface DataTableProps<Data> extends UseDataTableProps<Data> {
  className?: string
  /**
   * Name of the presented data entity
   * Used inside empty states, placeholders
   * Provide pluralized and lowercased
   * @example "users"
   * */
  entityName?: string
  header?: ReactNode | ViewRenderProp<Data>
  /**
   * Render props pattern to define different type of views than standard DataTableView
   * */
  children?: ViewRenderProp<Data>
  bordered?: boolean
  /**
   * Hides DataTable features, like header or pagination if not required
   * */
  minimal?: boolean
  tableView?: DataTableTableViewSpecificProps<Data>
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
  ...props
}: DataTableProps<Data>) => {
  const { table, setGlobalFilterDebounced } = useDataTable({
    data,
    columns,
    pageSize,
    ...props,
  })
  const rows = table.getRowModel().rows

  const viewProps = { table, entityName }

  return (
    <div
      className={cn(
        'rounded-md bg-surface-primary',
        bordered && 'border',
        className,
      )}
    >
      {!minimal && (
        <header className="flex items-center border-b p-4">
          <GlobalFilterInput
            onChange={(event) => setGlobalFilterDebounced(event.target.value)}
            entityName={entityName}
          />
          {typeof header === 'function' ? header(viewProps) : header}
        </header>
      )}
      {children ?
        children(viewProps)
      : <DataTableTableView {...tableView} {...viewProps} />}
      {(!minimal || table.getPageCount() > 1) && !!rows.length && (
        <footer className="flex items-center justify-between border-t p-4">
          <DataTablePagination table={table} />
        </footer>
      )}
    </div>
  )
}
