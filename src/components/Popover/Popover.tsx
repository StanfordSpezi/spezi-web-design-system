//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { X } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

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
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

export const PopoverCloseX = () => (
  <PopoverPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
    <X className="size-4" />
    <span className="sr-only">Close</span>
  </PopoverPrimitive.Close>
);

type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Content> & {
  arrow?: boolean;
};

export const PopoverContent = ({
  className,
  children,
  align = "center",
  sideOffset = 4,
  arrow,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "animate-entrance-fade-slide bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-sm outline-hidden",
        className,
      )}
      {...props}
    >
      {children}
      {arrow && <PopoverArrow className="fill-popover" width={12} height={8} />}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
);
