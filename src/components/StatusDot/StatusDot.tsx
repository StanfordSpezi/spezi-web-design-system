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
      default:
        "bg-muted-foreground [--glow-color:var(--color-muted-foreground)]",
      primary: "bg-primary [--glow-color:var(--color-primary)]",
      success: "bg-success [--glow-color:var(--color-success)]",
      warning: "bg-warning [--glow-color:var(--color-warning)]",
      destructive: "bg-destructive [--glow-color:var(--color-destructive)]",
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
      sm: "size-2 [--glow-size:1px]",
      md: "size-3 [--glow-size:2px]",
      lg: "size-4 [--glow-size:3px]",
    },
    /**
     * Controls the visual appearance of the dot.
     * - `solid`: standard filled dot
     * - `glow`: dot with a subtle glow effect
     *
     * @default "solid"
     */
    appearance: {
      solid: "",
      glow: "border-(length:--glow-size) border-[color-mix(in_srgb,var(--glow-color)_50%,transparent)] bg-clip-padding shadow-[0_0_calc(var(--glow-size)*3)_color-mix(in_srgb,var(--glow-color)_30%,transparent)]",
    },
  },
  defaultVariants: {
    status: "default",
    size: "sm",
    appearance: "solid",
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
 * ```tsx
 * // Basic status dot with automatic aria-label
 * <StatusDot status="success" />
 * ```
 *
 * @example
 * ```tsx
 * // With custom aria-label
 * <StatusDot status="success" aria-label="Task completed successfully" />
 * ```
 *
 * @example
 * ```tsx
 * // Hidden from screen readers when status is described elsewhere
 * <StatusDot status="success" aria-hidden />
 * ```
 *
 * @example
 * ```tsx
 * // Different statuses
 * <StatusDot status="primary" />
 * <StatusDot status="warning" />
 * <StatusDot status="destructive" />
 * ```
 *
 * @example
 * ```tsx
 * // Different sizes
 * <StatusDot status="success" size="sm" />
 * <StatusDot status="success" size="md" />
 * <StatusDot status="success" size="lg" />
 * ```
 *
 * @example
 * ```tsx
 * // Glow appearance for emphasis
 * <StatusDot status="success" appearance="glow" />
 * ```
 *
 * @example
 * ```tsx
 * // Custom colors
 * <StatusDot status={null} className="bg-blue-500" aria-label="In progress" />
 * <StatusDot status={null} appearance="glow" className="bg-purple-500 [--glow-color:theme(colors.purple.500)]" aria-label="Active" />
 * ```
 *
 * @example
 * ```tsx
 * // Custom size
 * <StatusDot size={null} className="size-10" />
 * <StatusDot size={null} appearance="glow" className="size-10 [--glow-size:4px]" />
 * ```
 */
export const StatusDot = ({
  className,
  status = "default",
  size = "sm",
  appearance = "solid",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = false,
  ...props
}: StatusDotProps) => {
  const getEffectiveAriaLabel = () => {
    if (ariaHidden) return undefined;
    if (ariaLabel) return ariaLabel;
    if (!status) return "Status indicator";

    const statusLabels = {
      default: "Neutral status",
      primary: "Active status",
      success: "Success status",
      warning: "Warning status",
      destructive: "Error status",
    } as const;

    return statusLabels[status];
  };

  return (
    <div
      role="img"
      aria-label={getEffectiveAriaLabel()}
      aria-hidden={ariaHidden}
      className={cn(statusDotVariance({ status, size, appearance }), className)}
      {...props}
    />
  );
};
