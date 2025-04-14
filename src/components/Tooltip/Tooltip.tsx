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
  children?: ReactNode;
  tooltip?: ReactNode;
}

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
