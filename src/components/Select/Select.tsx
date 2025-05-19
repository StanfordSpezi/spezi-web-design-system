//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

/**
 * Root component for the Select.
 * Controls the open state and value of the select.
 *
 * Built on top of [Radix UI Select](https://www.radix-ui.com/primitives/docs/components/select).
 */
export const Select = SelectPrimitive.Root;

/**
 * Groups related select options together.
 * Provides visual and semantic grouping of options.
 *
 * @example
 * <SelectGroup>
 *   <SelectLabel>Fruits</SelectLabel>
 *   <SelectItem value="apple">Apple</SelectItem>
 *   <SelectItem value="banana">Banana</SelectItem>
 * </SelectGroup>
 */
export const SelectGroup = SelectPrimitive.Group;

/**
 * Displays the currently selected value or placeholder.
 * Used inside SelectTrigger to show the current selection.
 *
 * @example
 * <SelectValue placeholder="Select a fruit" />
 */
export const SelectValue = SelectPrimitive.Value;

/**
 * Input-styled component that opens the select when clicked.
 *
 * @example
 * <SelectTrigger>
 *   <SelectValue placeholder="Select an option" />
 * </SelectTrigger>
 */
export const SelectTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    className={cn(
      "border-input bg-surface-primary ring-offset-surface placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-left",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

/**
 * Scroll up button for the select content.
 * Appears when there are more items to scroll to.
 */
export const SelectScrollUpButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
);

/**
 * Scroll down button for the select content.
 * Appears when there are more items to scroll to.
 */
export const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="size-4" />
  </SelectPrimitive.ScrollDownButton>
);

/**
 * Main content component for the Select.
 * Contains the list of selectable options.
 *
 * Handles portal, scroll buttons, styling and animations.
 *
 * @example
 * <SelectContent>
 *   <SelectItem value="option1">Option 1</SelectItem>
 *   <SelectItem value="option2">Option 2</SelectItem>
 * </SelectContent>
 */
export const SelectContent = ({
  className,
  children,
  position = "popper",
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        "animate-entrance-fade-slide bg-popover text-popover-foreground relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

/**
 * Label component for the select.
 * Provides a label for a group of options.
 *
 * @example
 * <SelectLabel>Category</SelectLabel>
 * <SelectItem value="1">Option 1</SelectItem>
 * <SelectItem value="2">Option 2</SelectItem>
 */
export const SelectLabel = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    className={cn("py-1.5 pr-2 pl-8 text-sm font-semibold", className)}
    {...props}
  />
);

type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item> & {
  /**
   * Provide itemText only if `children` is a complex ReactNode element.
   */
  itemText?: string;
};

/**
 * Item component for select options.
 * Represents a single selectable option.
 *
 * @example
 * <SelectItem value="1">Option 1</SelectItem>
 *
 * @example
 * // With custom text, for complex ReactNode labels
 * <SelectItem value="1" itemText="Custom text">
 *   <div>Option <b>1</b></div>
 * </SelectItem>
 */
export const SelectItem = ({
  className,
  children,
  itemText,
  ...props
}: SelectItemProps) => (
  <SelectPrimitive.Item
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute top-0 left-2 flex h-full w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    {itemText ?
      <>
        {children}
        <div className="hidden">
          <SelectPrimitive.ItemText className="hidden">
            {itemText}
          </SelectPrimitive.ItemText>
        </div>
      </>
    : <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>}
  </SelectPrimitive.Item>
);

/**
 * Separator component for the select.
 * Creates a visual divider between groups of items.
 *
 * @example
 * <SelectItem value="1">Option 1</SelectItem>
 * <SelectSeparator />
 * <SelectItem value="2">Option 2</SelectItem>
 */
export const SelectSeparator = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
    {...props}
  />
);
