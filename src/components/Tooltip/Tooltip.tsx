//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import * as RadixTooltip from "@radix-ui/react-tooltip";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "../../utils/className";

export const TooltipProvider = RadixTooltip.Provider;

export const TooltipRoot = RadixTooltip.Root;

export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = forwardRef<
  ElementRef<typeof RadixTooltip.Content>,
  ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixTooltip.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-max overflow-hidden rounded border bg-popover px-2 py-0.5 text-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = RadixTooltip.Content.displayName;

export interface TooltipProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixTooltip.Root>, "children">,
    Pick<
      ComponentPropsWithoutRef<typeof RadixTooltip.Content>,
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
