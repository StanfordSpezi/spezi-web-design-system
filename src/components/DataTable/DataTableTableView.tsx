//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { flexRender } from '@tanstack/react-table'
import { type MouseEvent } from 'react'
import { ToggleSortButton } from '@/components/DataTable/ToggleSortButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import { TableEmptyState } from '@/components/Table/TableEmptyState'
import { ensureString } from '@/utils/misc'
import type { DataTableViewProps } from './DataTable'

export interface DataTableTableViewSpecificProps<Data> {
  onRowClick?: (data: Data, event: MouseEvent) => void
  /**
   * Determines whether event is valid row click. Some table rows include interactive elements
   * isRowClicked allows excluding clicks that were bubbled up
   * */
  isRowClicked?: (event: MouseEvent) => boolean
}

const isRowClickedDefault = (event: MouseEvent) =>
  (event.target as HTMLElement).tagName === 'TD'

interface DataTableTableViewProps<Data>
  extends DataTableViewProps<Data>,
    DataTableTableViewSpecificProps<Data> {}

export const DataTableTableView = <Data,>({
  table,
  entityName,
  onRowClick,
  isRowClicked = isRowClickedDefault,
}: DataTableTableViewProps<Data>) => {
  const rows = table.getRowModel().rows
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} isHoverable={false}>
            {headerGroup.headers.map((header) => {
              const columnContent =
                header.isPlaceholder ? null : (
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )
                )
              return (
                <TableHead key={header.id}>
                  {header.column.getCanFilter() ?
                    <ToggleSortButton header={header}>
                      {columnContent}
                    </ToggleSortButton>
                  : columnContent}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {!rows.length ?
          <TableEmptyState
            entityName={entityName}
            colSpan={table.getAllColumns().length}
            textFilter={ensureString(table.getState().globalFilter)}
            hasFilters={table.getState().columnFilters.length > 0}
          />
        : rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              onClick={
                onRowClick ?
                  (event) => {
                    if (isRowClicked(event)) {
                      onRowClick(row.original, event)
                    }
                  }
                : undefined
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
