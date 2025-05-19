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

/**
 * Root component for the Popover.
 * Controls the open state of the popover.
 *
 * Built on top of [Radix UI Popover](https://www.radix-ui.com/primitives/docs/components/popover).
 */
export const PopoverRoot = PopoverPrimitive.Root;

/**
 * Element that triggers the popover to open when interacted with.
 *
 * Can be used to wrap any interactive element that should activate the popover.
 */
export const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Visual arrow element that points to the trigger.
 *
 * Can be used to visually connect the popover to its trigger element.
 */
export const PopoverArrow = PopoverPrimitive.Arrow;

/**
 * Container for popover heading elements.
 *
 * Typically contains PopoverTitle and/or PopoverDescription components.
 * Provides consistent spacing and alignment for header content.
 *
 * @example
 * <PopoverHeader>
 *   <PopoverTitle>Settings</PopoverTitle>
 *   <PopoverDescription>Configure your preferences</PopoverDescription>
 * </PopoverHeader>
 */
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

/**
 * Displays the main heading of the popover content with appropriate styling.
 * Typically used within PopoverHeader.
 *
 * @example
 * <PopoverTitle>Account Settings</PopoverTitle>
 */
export const PopoverTitle = ({ className, ...props }: ComponentProps<"h6">) => (
  <h6 className={cn("text-lg font-semibold", className)} {...props} />
);

/**
 * Provides additional context or explanation below the PopoverTitle.
 * Rendered with muted styling to create visual hierarchy.
 *
 * @example
 * <PopoverDescription>Manage your account settings and preferences</PopoverDescription>
 */
export const PopoverDescription = ({
  className,
  ...props
}: ComponentProps<"h6">) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

/**
 * Close button component for the popover with an X icon.
 *
 * Positioned in the top-right corner of the popover by default.
 *
 * @example
 * <PopoverContent>
 *   <PopoverCloseX />
 *   <PopoverHeader>
 *     <PopoverTitle>Settings</PopoverTitle>
 *   </PopoverHeader>
 * </PopoverContent>
 */
export const PopoverCloseX = () => (
  <PopoverPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
    <X className="size-4" />
    <span className="sr-only">Close</span>
  </PopoverPrimitive.Close>
);

type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Content> & {
  /**
   * Whether to show an arrow pointing to the trigger.
   */
  arrow?: boolean;
};

/**
 * Main content container for the Popover.
 *
 * Handles portal, arrow support, styling and animations.
 *
 * @example
 * <PopoverContent>
 *   <PopoverHeader>
 *     <PopoverTitle>Settings</PopoverTitle>
 *     <PopoverDescription>Configure your account</PopoverDescription>
 *   </PopoverHeader>
 *   <PopoverCloseX />
 * </PopoverContent>
 */
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
