//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

export const statusDotVariance = cva("rounded-full", {
  variants: {
    /**
     * Controls the visual status of the dot.
     * - `default`: neutral/inactive state
     * - `primary`: active/enabled state
     * - `success`: positive/successful state
     * - `warning`: attention/caution state
     * - `destructive`: negative/error state
     *
     * @default "default"
     */
    status: {
      default: "bg-muted-foreground",
      primary: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
    /**
     * Controls the size of the status dot.
     * - `sm`: size-2 (0.5rem) diameter
     * - `md`: size-3 (0.75rem) diameter
     * - `lg`: size-4 (1rem) diameter
     *
     * @default "sm"
     */
    size: {
      sm: "size-2",
      md: "size-3",
      lg: "size-4",
    },
  },
  defaultVariants: {
    status: "default",
    size: "sm",
  },
});

export interface StatusDotProps
  extends ComponentProps<"div">,
    VariantProps<typeof statusDotVariance> {
  /**
   * Screen reader label for the status dot.
   * If not provided, a default label will be generated based on the status.
   */
  "aria-label"?: string;
  /**
   * Whether the status dot should be hidden from screen readers.
   * Use this when the status is already described by surrounding text.
   *
   * @default false
   */
  "aria-hidden"?: boolean;
}

/**
 * A small visual indicator used to represent status, state, or activity.
 * Status dots are commonly used in badges, lists, and other UI components
 * to provide quick visual feedback about an item's state.
 *
 * @example
 * // Basic status dot with automatic aria-label
 * <StatusDot status="success" />
 *
 * @example
 * // With custom aria-label
 * <StatusDot status="success" aria-label="Task completed successfully" />
 *
 * @example
 * // Hidden from screen readers when status is described elsewhere
 * <StatusDot status="success" aria-hidden />
 *
 * @example
 * // Different statuses
 * <StatusDot status="primary" />
 * <StatusDot status="warning" />
 * <StatusDot status="destructive" />
 *
 * @example
 * // Different sizes
 * <StatusDot status="success" size="sm" />
 * <StatusDot status="success" size="md" />
 * <StatusDot status="success" size="lg" />
 */
export const StatusDot = ({
  className,
  status = "default",
  size = "sm",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = false,
  ...props
}: StatusDotProps) => {
  // Generate default aria-label based on status if not provided and not hidden
  const getDefaultAriaLabel = (
    statusValue: VariantProps<typeof statusDotVariance>["status"],
  ) => {
    if (!statusValue) {
      return "Status indicator";
    }

    const statusLabels = {
      default: "Neutral status",
      primary: "Active status",
      success: "Success status",
      warning: "Warning status",
      destructive: "Error status",
    } as const;

    return statusLabels[statusValue];
  };

  const effectiveAriaLabel =
    ariaHidden ? undefined : (ariaLabel ?? getDefaultAriaLabel(status));

  return (
    <div
      role="img"
      aria-label={effectiveAriaLabel}
      aria-hidden={ariaHidden}
      className={cn(statusDotVariance({ status, size }), className)}
      {...props}
    />
  );
};
