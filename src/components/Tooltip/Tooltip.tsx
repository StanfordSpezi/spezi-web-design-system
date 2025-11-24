//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cva, type VariantProps } from "class-variance-authority";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/utils/className";

export const TooltipProvider = TooltipPrimitive.Provider;

export const TooltipRoot = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const tooltipVariants = {
  /**
   * Controls the visual variant of the tooltip.
   * - `default`: Similar to popover styling. Use for most cases when the tooltip needs to blend with the interface.
   * - `inverted`: Inverted color styles. Use when higher contrast is needed or when the tooltip must stand out against busy backgrounds.
   *
   * @default "default"
   */
  variant: {
    default: "bg-popover text-popover-foreground",
    inverted: "bg-inverted text-inverted-foreground",
  },
};

export const tooltipVariance = cva(
  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-max overflow-hidden rounded-sm border px-2 py-0.5 shadow-sm",
  {
    variants: tooltipVariants,
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TooltipContentProps
  extends ComponentProps<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariance> {}

/**
 * Main content container for Tooltip.
 * Contains Tooltip's inner content.
 *
 * @example
 * ```tsx
 * <TooltipContent>
 *   Tooltip text
 * </TooltipContent>
 * ```
 */
export const TooltipContent = ({
  className,
  sideOffset = 4,
  variant,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Content
    sideOffset={sideOffset}
    className={cn(tooltipVariance({ variant, className }))}
    {...props}
  />
);

export interface TooltipProps
  extends Omit<
      ComponentProps<typeof TooltipPrimitive.Root>,
      "children" | "delayDuration"
    >,
    Pick<
      ComponentProps<typeof TooltipPrimitive.Content>,
      "sideOffset" | "className" | "side"
    >,
    VariantProps<typeof tooltipVariance> {
  /**
   * Slot for the main content that should trigger the Tooltip.
   */
  children?: ReactNode;
  /**
   * Tooltip's content.
   */
  tooltip?: ReactNode;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 0
   */
  delayDuration?: number;
}

/**
 * A component that displays additional information when hovering over an element.
 * Built on top of [radix-ui Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip).
 *
 * For interactive tooltips, see {@link PopoverRoot|Popover}
 *
 * @example
 * ```tsx
 * <Tooltip tooltip="Click to save">
 *   <Button>Save</Button>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * <Tooltip variant="inverted" tooltip="High contrast tooltip">
 *   <Button>Save</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip = ({
  children,
  tooltip,
  className,
  sideOffset,
  side,
  variant,
  delayDuration = 0,
  ...rootProps
}: TooltipProps) => (
  <TooltipProvider>
    <TooltipRoot {...rootProps} delayDuration={delayDuration}>
      {children && <TooltipTrigger asChild>{children}</TooltipTrigger>}
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        variant={variant}
        className={className}
      >
        {tooltip}
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
);
