//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { EmptyState, type EmptyStateProps } from '../../EmptyState'
import { TableCell, TableRow } from '../Table'

interface TableEmptyStateProps extends EmptyStateProps {
  colSpan: number
}

export const TableEmptyState = ({
  colSpan,
  ...props
}: TableEmptyStateProps) => (
  <TableRow isHoverable={false}>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      <EmptyState {...props} />
    </TableCell>
  </TableRow>
)
