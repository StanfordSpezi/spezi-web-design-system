//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { SearchX, ListX } from 'lucide-react'
import { type HTMLProps, type ReactNode } from 'react'
import { cn } from '../../utils/className'

export interface EmptyStateProps extends HTMLProps<HTMLDivElement> {
  /**
   * Name of the presented missing data entity
   * Provide pluralized and lowercased
   * @example "users"
   * */
  entityName?: ReactNode
  /**
   * Provide text filter that data is filtered by
   * */
  textFilter?: string
  /**
   * Provide whether data is filtered by other filters, excluding global text filter
   * */
  hasFilters?: boolean
}

export const EmptyState = ({
  entityName,
  textFilter,
  hasFilters,
  className,
  children,
  ...props
}: EmptyStateProps) => (
  <div
    className={cn('flex-center gap-3 text-muted-foreground', className)}
    {...props}
  >
    {textFilter ?
      <SearchX />
    : <ListX />}
    <span>
      {children ?? (
        <>
          No {entityName ?? 'results'} found
          {textFilter ?
            <>
              &nbsp;for <i>"{textFilter}"</i> search
            </>
          : hasFilters ?
            <>&nbsp;for your selected filters</>
          : null}
          .
        </>
      )}
    </span>
  </div>
)
