//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { cn } from "../../utils/className";

export const PopoverRoot = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverArrow = PopoverPrimitive.Arrow;

export const PopoverHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

export const PopoverTitle = ({ className, ...props }: ComponentProps<"h6">) => (
  <h6 className={cn("text-lg font-semibold", className)} {...props} />
);

export const PopoverDescription = ({
  className,
  ...props
}: ComponentProps<"h6">) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export const PopoverCloseX = () => (
  <PopoverPrimitive.Close className="ring-offset-background absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
    <X className="size-4" />
    <span className="sr-only">Close</span>
  </PopoverPrimitive.Close>
);

type PopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> & { arrow?: boolean };

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    { className, children, align = "center", sideOffset = 4, arrow, ...props },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow outline-none",
          className,
        )}
        {...props}
      >
        {children}
        {arrow && (
          <PopoverArrow className="fill-popover" width={12} height={8} />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
