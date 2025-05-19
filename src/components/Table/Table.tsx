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
  <div className="relative w-full overflow-auto">
    <table
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
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);

/**
 * Styled `tbody` element.
 */
export const TableBody = ({ className, ...props }: ComponentProps<"tbody">) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

/**
 * Styled `tfoot` element.
 */
export const TableFooter = ({
  className,
  ...props
}: ComponentProps<"tfoot">) => (
  <tfoot
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
    className={cn(
      "data-[state=selected]:bg-muted border-b transition-colors",
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
    className={cn(
      "p-4 text-left align-middle [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);
