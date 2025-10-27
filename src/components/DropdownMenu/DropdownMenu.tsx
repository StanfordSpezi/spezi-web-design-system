//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Check, ChevronRight, Circle } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

/**
 * Root container for DropdownMenu components.
 * Controls the open state of the dropdown menu.
 *
 * Built on top of [Radix UI Dropdown](https://www.radix-ui.com/primitives/docs/components/dropdown-menu).
 */
export const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * Element that toggles the dropdown menu.
 * Must be wrapped in the DropdownMenu component.
 *
 * @example
 * ```tsx
 * // renders Button as trigger
 * <DropdownMenuTrigger asChild>
 *   <Button variant="outline">Trigger</Button>
 * </DropdownMenuTrigger>
 * ```
 */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * Groups multiple menu items together.
 * Useful for organizing related menu options.
 */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * Portal for rendering dropdown content outside its parent hierarchy.
 * Prevents layout issues in complex UIs.
 */
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * Creates a submenu within a dropdown menu.
 * Useful for nested navigation structures.
 */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * Container for radio items in a dropdown menu.
 * Allows for mutually exclusive selection of options.
 */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * Trigger element for a submenu within a dropdown.
 * Displays a chevron icon to indicate nested content.
 */
export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-hidden select-none",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
);

/**
 * Content container for submenu items.
 */
export const DropdownMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      "animate-entrance-fade-slide bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1",
      className,
    )}
    {...props}
  />
);

type DropdownMenuContentProps = ComponentProps<
  typeof DropdownMenuPrimitive.Content
> & {
  /**
   * Controls Portal's container.
   * Pass `null` to disable portal.
   */
  container?: HTMLElement | null;
};

/**
 * Displays the main content of a dropdown menu.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 *
 * @example
 * ```tsx
 * // Render inline without portal
 * <DropdownMenuContent container={null}>
 *   <DropdownMenuItem>Item</DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 */
export const DropdownMenuContent = ({
  className,
  container,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) => {
  const content = (
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "animate-entrance-fade-slide bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    />
  );
  return container === null ? content : (
      <DropdownMenuPrimitive.Portal container={container}>
        {content}
      </DropdownMenuPrimitive.Portal>
    );
};

/**
 * Standard menu item for dropdown menus.
 * Renders a selectable option.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem onClick={() => signOut()}>
 *   <LogOut />
 *   Sign out
 * </DropdownMenuItem>
 * ```
 *
 * @example
 * ```tsx
 * // as link
 * <DropdownMenuItem asChild>
 *   <Link href="/account">
 *     Account
 *   </Link>
 * </DropdownMenuItem>
 * ```
 */
export const DropdownMenuItem = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-hidden transition select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);

/**
 * Checkbox menu item for dropdown menus.
 * Displays a checkmark when selected.
 * Supports three states: checked, unchecked, and indeterminate.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuContent>
 *     <DropdownMenuCheckboxItem checked={isChecked} onCheckedChange={setIsChecked}>
 *       Show notifications
 *     </DropdownMenuCheckboxItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition select-none data-disabled:pointer-events-none data-disabled:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="flex-center absolute left-2 size-3.5">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
/**
 * Radio menu item for dropdown menus.
 * Displays a filled circle when selected.
 * Must be used inside a DropdownMenuRadioGroup.
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
 *   <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
export const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition select-none data-disabled:pointer-events-none data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

type DropdownMenuLabelProps = ComponentProps<
  typeof DropdownMenuPrimitive.Label
> & {
  inset?: boolean;
};

/**
 * Non-interactive label element for dropdown menus.
 * Useful for creating section headers or group titles within the menu.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>Account</DropdownMenuLabel>
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Settings</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);

/**
 * Visual separator line for dropdown menus.
 * Creates a horizontal rule to divide sections within the menu.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Settings</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
    {...props}
  />
);

/**
 * Displays keyboard shortcut hints in dropdown menu items.
 * Renders with subtle styling to indicate keyboard commands without overwhelming the UI.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   New File
 *   <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);
