//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ListX, SearchX } from "lucide-react";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/utils/className";

export interface EmptyStateProps
  extends Omit<ComponentProps<"div">, "children" | "action"> {
  /**
   * Custom content to display in the empty state.
   *
   * @remarks
   * Only provide this prop when you need to customize the empty state message.
   * When not provided, a default message will be automatically constructed
   * based on the entityName prop.
   */
  children?: ReactNode;
  /**
   * Name of the presented missing data entity.
   * Provide pluralized and lowercased.
   * @example "users"
   */
  entityName?: ReactNode;
  /**
   * Provide a text filter value that data is filtered by.
   */
  textFilter?: string;
  /**
   * Provide whether data is filtered by other filters, excluding text filter.
   */
  hasFilters?: boolean;
  /**
   * Slot to render action buttons.
   * If an empty state can be fixed by a user's action, it's worth making it clear and accessible.
   */
  actions?: ReactNode;
}

/**
 * A component for displaying empty states in lists, tables, or other data displays.
 *
 *
 * Shows different states based on whether the user already filtered the data.
 * This reduces the chance of misinterpretations and reduces user's anxiety.
 *
 * Automatically constructs messages based on `entityName`.
 *
 * @example
 * // Basic usage
 * <EmptyState entityName="users" />
 *
 * @example
 * // With text filter
 * <EmptyState
 *   entityName="users"
 *   textFilter="John"
 * />
 *
 * @example
 * // With other filters
 * <EmptyState
 *   entityName="users"
 *   hasFilters
 * />
 *
 * @example
 * // With custom content and actions
 * <EmptyState
 *   entityName="users"
 *   actions={<Button>Add User</Button>}
 * >
 *   <p>No users found in the system.</p>
 * </EmptyState>
 */
export const EmptyState = ({
  entityName,
  textFilter,
  hasFilters,
  className,
  children,
  actions,
  ...props
}: EmptyStateProps) => (
  <div
    role="status"
    aria-live="polite"
    className={cn("text-muted-foreground flex gap-3", className)}
    {...props}
  >
    {textFilter ?
      <SearchX />
    : <ListX />}
    <span className="flex flex-col gap-3">
      {children ?? (
        <span>
          No {entityName ?? "results"} found
          {textFilter ?
            <>
              &nbsp;for <i>"{textFilter}"</i> search
            </>
          : hasFilters ?
            <>&nbsp;for your selected filters</>
          : null}
          .
        </span>
      )}
      {actions && <div className="flex gap-2">{actions}</div>}
    </span>
  </div>
);
