//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Tooltip as TooltipPrimitive } from "radix-ui";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/utils/className";

export const TooltipProvider = TooltipPrimitive.Provider;

export const TooltipRoot = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Main content container for Tooltip.
 * Contains Tooltip's inner content.
 *
 * @example
 * <TooltipContent>
 *   Tooltip text
 * </TooltipContent>
 */
export const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Content
    sideOffset={sideOffset}
    className={cn(
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-foreground z-50 w-max overflow-hidden rounded-sm border px-2 py-0.5",
      className,
    )}
    {...props}
  />
);

export interface TooltipProps
  extends Omit<ComponentProps<typeof TooltipPrimitive.Root>, "children">,
    Pick<
      ComponentProps<typeof TooltipPrimitive.Content>,
      "sideOffset" | "className" | "side"
    > {
  /**
   * Slot for the main content that should trigger the Tooltip.
   */
  children?: ReactNode;
  /**
   * Tooltip's content.
   */
  tooltip?: ReactNode;
}

/**
 * A component that displays additional information when hovering over an element.
 * Built on top of [radix-ui Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip).
 *
 * For interactive tooltips, see [Popover](src/components/Popover/Popover.tsx)
 *
 * @example
 * <Tooltip tooltip="Click to save">
 *   <Button>Save</Button>
 * </Tooltip>
 */
export const Tooltip = ({
  children,
  tooltip,
  className,
  sideOffset,
  side,
  delayDuration = 0,
  ...rootProps
}: TooltipProps) => (
  <TooltipProvider>
    <TooltipRoot {...rootProps} delayDuration={delayDuration}>
      {children && <TooltipTrigger asChild>{children}</TooltipTrigger>}
      <TooltipContent side={side} sideOffset={sideOffset} className={className}>
        {tooltip}
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
);
