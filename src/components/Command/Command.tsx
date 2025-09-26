//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Command as CommandPrimitive } from "cmdk";
import { Search, SearchX } from "lucide-react";
import { type ComponentProps } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/Dialog";
import { cn } from "@/utils/className";

/**
 * Root command component built on top of [cmdk](https://github.com/pacocoursey/cmdk).
 *
 * Provides the container and base styles. Compose with `CommandInput`, `CommandList`,
 * `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandEmpty`, and `CommandShortcut`.
 *
 * @example
 * // Basic searchable list
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>
 *         Calculator
 *         <CommandShortcut>⌘K</CommandShortcut>
 *       </CommandItem>
 *     </CommandGroup>
 *     <CommandSeparator />
 *     <CommandGroup heading="Settings">
 *       <CommandItem>Profile</CommandItem>
 *       <CommandItem>Billing</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 */
export const Command = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    data-slot="command"
    className={cn(
      "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
      className,
    )}
    {...props}
  />
);

interface CommandDialogContentProps
  extends ComponentProps<typeof DialogContent> {
  /**
   * Accessible title announced by screen readers. Visually hidden.
   * @default "Command Palette"
   */
  title?: string;
  /**
   * Accessible description announced by screen readers. Visually hidden.
   * @default "Search for a command to run..."
   */
  description?: string;
}

/**
 * Command dialog content composed of `DialogContent` and `Command`.
 *
 * Use this inside your own `Dialog` wrapper for maximum composability.
 * The `title` and `description` are announced to assistive tech but are visually hidden.
 *
 * @example
 * const [open, setOpen] = useState(false);
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <CommandDialogContent title="Command Palette">
 *     <CommandInput placeholder="Search..." />
 *     <CommandList>
 *       <CommandGroup heading="Files">
 *         <CommandItem>Open Recent</CommandItem>
 *       </CommandGroup>
 *     </CommandList>
 *   </CommandDialogContent>
 * </Dialog>
 */
export const CommandDialogContent = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  ...props
}: CommandDialogContentProps) => (
  <DialogContent className={cn("overflow-hidden !p-0", className)} {...props}>
    {/* Hidden header elements to improve a11y */}
    <DialogTitle className="sr-only">{title}</DialogTitle>
    <DialogDescription className="sr-only">{description}</DialogDescription>
    <Command
      className={cn(
        "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium",
        "[&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0",
        "**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12",
        "[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3",
        "[&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
      )}
    >
      {children}
    </Command>
  </DialogContent>
);

/**
 * Search input with an inline search icon and bottom border.
 *
 * Place inside `Command` (or compose with `Dialog` using `CommandDialogContent`) to filter list items automatically.
 *
 * @example
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandItem>Calendar</CommandItem>
 *     <CommandItem>Calculator</CommandItem>
 *   </CommandList>
 * </Command>
 */
export const CommandInput = ({
  className,
  placeholder = "Search...",
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) => (
  <div
    data-slot="command-input-wrapper"
    className="flex h-9 items-center gap-2 border-b px-3"
  >
    <Search className="size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      data-slot="command-input"
      placeholder={placeholder}
      className={cn(
        "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
);

/**
 * Scrollable list container for groups and items.
 *
 * Must wrap `CommandGroup`, `CommandItem`, `CommandEmpty`, and `CommandSeparator`.
 *
 * @example
 * <CommandList>
 *   <CommandEmpty>No results</CommandEmpty>
 *   <CommandGroup heading="General">
 *     <CommandItem>Open</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 */
export const CommandList = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    data-slot="command-list"
    className={cn(
      "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
      className,
    )}
    {...props}
  />
);

/**
 * Displayed when there are no results.
 *
 * @example
 * <CommandList>
 *   <CommandEmpty>No results found.</CommandEmpty>
 * </CommandList>
 */
export const CommandEmpty = ({
  className,
  children = "No results found",
  ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty
    data-slot="command-empty"
    className={cn(
      "text-muted-foreground flex-center gap-2 py-6 text-center text-sm",
      className,
    )}
    {...props}
  >
    <SearchX className="size-4" />
    {children}
  </CommandPrimitive.Empty>
);

/**
 * Group container with heading support.
 *
 * @example
 * <CommandList>
 *   <CommandGroup heading="Suggestions">
 *     <CommandItem>Calendar</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 */
export const CommandGroup = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    data-slot="command-group"
    className={cn(
      "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      className,
    )}
    {...props}
  />
);

/**
 * Visual separator between items/groups.
 *
 * @example
 * <CommandList>
 *   <CommandGroup heading="General" />
 *   <CommandSeparator />
 *   <CommandGroup heading="Settings" />
 * </CommandList>
 */
export const CommandSeparator = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    data-slot="command-separator"
    className={cn("bg-border -mx-1 h-px", className)}
    {...props}
  />
);

/**
 * Selectable item row.
 *
 * @example
 * <CommandItem>
 *   Open File
 *   <CommandShortcut>⌘O</CommandShortcut>
 * </CommandItem>
 */
export const CommandItem = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    data-slot="command-item"
    className={cn(
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  />
);

/**
 * Right-aligned keyboard shortcut hint.
 *
 * @example
 * <CommandItem>
 *   Preferences
 *   <CommandShortcut>⌘,</CommandShortcut>
 * </CommandItem>
 */
export const CommandShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    data-slot="command-shortcut"
    className={cn(
      "text-muted-foreground ml-auto text-xs tracking-widest",
      className,
    )}
    {...props}
  />
);
