//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Row } from '@tanstack/react-table'
import { type ReactNode } from 'react'
import { EmptyState } from '@/components/EmptyState'
import { ensureString } from '@/utils/misc'
import type { DataTableViewProps } from './DataTable'

interface DataTableBasicViewProps<Data> extends DataTableViewProps<Data> {
  children: (rows: Array<Row<Data>>) => ReactNode
}

/**
 * Handles basic states for custom DataTable views
 *
 * @example See `DataTable.stories#CustomView`
 * */
export const DataTableBasicView = <Data,>({
  table,
  entityName,
  children,
}: DataTableBasicViewProps<Data>) => {
  const rows = table.getRowModel().rows
  return (
    <div>
      {!rows.length ?
        <EmptyState
          entityName={entityName}
          textFilter={ensureString(table.getState().globalFilter)}
          hasFilters={table.getState().columnFilters.length > 0}
          className="h-24"
        />
      : children(rows)}
    </div>
  )
}
