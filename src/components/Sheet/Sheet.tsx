//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { X } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { type Size, sizeToMaxWidthRecord } from "@/utils/tailwind";

/**
 * Main wrapper for Sheet functionality.
 *
 * Sheets are used to present content that requires user interaction
 * while temporarily blocking interaction with the main content.
 * Unlike Dialog, Sheet slides in from the edge of the screen.
 *
 * Sheets are composed using smaller components to ensure high customization
 * yet maintaining consistency.
 *
 * Built on top of [radix-ui Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 *
 * @example
 * ```tsx
 * // Basic usage with SheetTrigger
 * <Sheet>
 *   <SheetTrigger>Open Settings</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Settings</SheetTitle>
 *       <SheetDescription>
 *         Configure your application preferences
 *       </SheetDescription>
 *     </SheetHeader>
 *     <div className="space-y-4">
 *       content
 *     </div>
 *     <SheetFooter>
 *       <Button variant="outline">Reset</Button>
 *       <Button>Save Changes</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled sheet
 * const [open, setOpen] = useState(false);
 *
 * <Sheet open={open} onOpenChange={setOpen}>
 *   <SheetTrigger>View Profile</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>User Profile</SheetTitle>
 *     </SheetHeader>
 *     <div className="space-y-4">
 *       content
 *     </div>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export const Sheet = SheetPrimitive.Root;

export const SheetTrigger = SheetPrimitive.Trigger;

export const SheetPortal = SheetPrimitive.Portal;

export const SheetClose = SheetPrimitive.Close;

/**
 * A styled close button with an X icon for Sheet components.
 * Positioned in the top-right corner of a Sheet by default.
 *
 * @example
 * ```tsx
 * <SheetContent>
 *   <SheetTitle>Settings</SheetTitle>
 *   <SheetCloseX />
 *   <p>Sheet content...</p>
 * </SheetContent>
 * ```
 */
export const SheetCloseX = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Close>) => (
  <SheetPrimitive.Close
    className={cn(
      "focus-ring absolute top-4 right-4 opacity-70 transition hover:opacity-100 disabled:pointer-events-none",
      className,
    )}
    {...props}
  >
    <X className="size-4" />
    <span className="sr-only">Close</span>
  </SheetPrimitive.Close>
);

/**
 * Displays overlay behind the main sheet content. Necessary to achieve sheet's modality.
 */
export const SheetOverlay = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Overlay>) => (
  <SheetPrimitive.Overlay
    className={cn(
      "animate-entrance-fade fixed inset-0 z-50 bg-black/20",
      className,
    )}
    data-slot="sheet-overlay"
    {...props}
  />
);

export const sheetSides = ["top", "right", "bottom", "left"] as const;
export type SheetSide = (typeof sheetSides)[number];

export interface SheetContentElementProps
  extends ComponentProps<typeof SheetPrimitive.Content> {
  /**
   * Determines which side of the screen the sheet slides in from.
   * @default "right"
   */
  side?: SheetSide;
  /**
   * Determines maximum width of the sheet. Applies only if `side` is `left` or `right`.
   * If `null`, size is dynamically determined based on the content.
   *
   * @default "sm"
   */
  size?: Size | null;
}

/**
 * Ready to use SheetContent. Provides default modality styling and animations.
 */
export const SheetContentElement = ({
  side = "right",
  className,
  size = "sm",
  children,
  ...props
}: SheetContentElementProps) => (
  <SheetPrimitive.Content
    className={cn(
      "bg-surface data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 overflow-y-auto p-4 shadow-lg transition duration-300 [--screenGap:2rem] lg:[--screenGap:3rem]",
      side === "right" || side === "left" ?
        [
          "inset-y-0 h-full w-[calc(100vw-var(--screenGap))]",
          size && sizeToMaxWidthRecord[size],
        ]
      : "inset-x-0 h-auto max-h-[calc(100vh-var(--screenGap))]",
      side === "right" ?
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right right-0 border-l"
      : side === "left" ?
        "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left left-0 border-r"
      : side === "top" ?
        "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top top-0 border-b"
      : "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom bottom-0 border-t",
      className,
    )}
    data-slot="sheet-content"
    {...props}
  >
    {children}
  </SheetPrimitive.Content>
);

export interface SheetContentProps extends SheetContentElementProps {}

/**
 * The main content container for the Sheet. Provides complete Sheet experience with reasonable defaults.
 *
 * Handles portal, overlay, animations, close button.
 * If Sheet has more specified needs, it has to opt out from this component and use primitives directly.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SheetContent>
 *   <SheetTitle>Sheet Title</SheetTitle>
 *   <p>Sheet content</p>
 * </SheetContent>
 * ```
 *
 * @example
 * ```tsx
 * // With custom side
 * <SheetContent side="left">
 *   <SheetTitle>Left Sheet</SheetTitle>
 * </SheetContent>
 * ```
 */
export const SheetContent = ({ children, ...props }: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetContentElement {...props}>
      {children}
      <SheetCloseX />
    </SheetContentElement>
  </SheetPortal>
);

/**
 * Container for sheet header elements.
 *
 * Typically contains {@link SheetTitle} and optionally {@link SheetDescription} components.
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Settings</SheetTitle>
 *   <SheetDescription>Configure your preferences</SheetDescription>
 * </SheetHeader>
 * ```
 */
export const SheetHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("flex flex-col gap-1.5", className)}
    data-slot="sheet-header"
    {...props}
  />
);

/**
 * Container for Sheet footer elements.
 *
 * Provides consistent spacing and layout for sheet actions like buttons.
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save Changes</Button>
 * </SheetFooter>
 * ```
 */
export const SheetFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("flex justify-end gap-2", className)}
    data-slot="sheet-footer"
    {...props}
  />
);

/**
 * Title component for Sheet.
 *
 * Automatically sets the correct ARIA attributes for accessibility.
 * Renders a semantically marked heading for the sheet content.
 * Required for accessibility but can be visually hidden if necessary.
 *
 * @example
 * ```tsx
 * <SheetTitle>Account Settings</SheetTitle>
 * ```
 *
 * @example
 * ```tsx
 * // hidden visually
 * <SheetTitle className="hidden">Account Settings</SheetTitle>
 * ```
 */
export const SheetTitle = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) => (
  <SheetPrimitive.Title
    className={cn("text-foreground font-semibold", className)}
    data-slot="sheet-title"
    {...props}
  />
);

/**
 * Description component for Sheet.
 *
 * Provides additional context or explanation below the SheetTitle.
 * Automatically sets the correct ARIA attributes for accessibility.
 * Rendered with muted styling to create visual hierarchy.
 *
 * @example
 * ```tsx
 * <SheetDescription>
 *   Make changes to your profile information. Your data will be updated across all services.
 * </SheetDescription>
 * ```
 */
export const SheetDescription = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) => (
  <SheetPrimitive.Description
    className={cn("text-muted-foreground text-sm", className)}
    data-slot="sheet-description"
    {...props}
  />
);
