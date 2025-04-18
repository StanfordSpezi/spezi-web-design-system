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
   * Provide `children` only if you wish to customize empty message.
   * If children is not provided, default message is constructed.
   * */
  children?: ReactNode;
  /**
   * Name of the presented missing data entity
   * Provide pluralized and lowercased
   * @example "users"
   * */
  entityName?: ReactNode;
  /**
   * Provide text filter that data is filtered by
   * */
  textFilter?: string;
  /**
   * Provide whether data is filtered by other filters, excluding global text filter
   * */
  hasFilters?: boolean;
  /**
   * Slot to render action buttons
   * */
  actions?: ReactNode;
}

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
