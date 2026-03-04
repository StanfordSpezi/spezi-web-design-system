//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps } from "react";
import { cn } from "@/utils/className";

/**
 * Table primitives for creating Table UI. For ready table component, use DataTable.
 */
export const Table = ({ className, ...props }: ComponentProps<"table">) => (
  <div data-slot="table-wrapper" className="relative w-full overflow-auto">
    <table
      data-slot="table"
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

/**
 * Styled `thead` element.
 */
export const TableHeader = ({
  className,
  ...props
}: ComponentProps<"thead">) => (
  <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />
);

/**
 * Styled `tbody` element.
 */
export const TableBody = ({ className, ...props }: ComponentProps<"tbody">) => (
  <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

/**
 * Styled `tfoot` element.
 */
export const TableFooter = ({
  className,
  ...props
}: ComponentProps<"tfoot">) => (
  <tfoot
    data-slot="table-footer"
    className={cn(
      "bg-muted/50 border-t font-medium last:[&>tr]:border-b-0",
      className,
    )}
    {...props}
  />
);

export interface TableRowProps extends ComponentProps<"tr"> {
  /**
   * Adds hover styles.
   *
   * @default true
   */
  isHoverable?: boolean;
}

/**
 * Styled `tr` element. Adds proper focus and tab index when `onClick` is provided.
 */
export const TableRow = ({
  className,
  onClick,
  isHoverable = true,
  ...props
}: TableRowProps) => (
  <tr
    data-slot="table-row"
    className={cn(
      "data-[state=selected]:bg-muted border-b transition",
      isHoverable && "hover:bg-muted/50",
      onClick &&
        "focus-visible:bg-primary/10 cursor-pointer focus-visible:outline-hidden",
      className,
    )}
    onClick={onClick}
    {...(onClick ? { tabIndex: 0 } : undefined)}
    {...props}
  />
);

/**
 * Styled `th` element.
 */
export const TableHead = ({ className, ...props }: ComponentProps<"th">) => (
  <th
    data-slot="table-head"
    className={cn(
      "text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);

/**
 * Styled `td` element.
 */
export const TableCell = ({ className, ...props }: ComponentProps<"td">) => (
  <td
    data-slot="table-cell"
    className={cn(
      "p-4 text-left align-middle [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);
