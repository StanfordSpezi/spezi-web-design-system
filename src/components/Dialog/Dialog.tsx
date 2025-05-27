//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { type Size, sizeToMaxWidthRecord } from "@/utils/tailwind";

/**
 * Main wrapper for Dialog functionality.
 *
 * Dialogs are used to present content that requires user interaction
 * while temporarily blocking interaction with the main content.
 *
 * Dialogs are composed using smaller components to ensure high customization
 * yet maintaining consistency.
 *
 * Built on top of [radix-ui Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 *
 * @example
 * // Basic usage with DialogTrigger
 * <Dialog>
 *   <DialogTrigger>Open Settings</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Settings</DialogTitle>
 *       <DialogDescription>
 *         Configure your application preferences
 *       </DialogDescription>
 *     </DialogHeader>
 *     <div className="space-y-4">
 *       content
 *     </div>
 *     <DialogFooter>
 *       <Button variant="outline">Reset</Button>
 *       <Button>Save Changes</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 *
 * @example
 * // Controlled dialog
 * const [open, setOpen] = useState(false);
 *
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogTrigger>View Profile</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>User Profile</DialogTitle>
 *     </DialogHeader>
 *     <div className="space-y-4">
 *       content
 *     </div>
 *   </DialogContent>
 * </Dialog>
 */
export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogClose = DialogPrimitive.Close;

/**
 * A styled close button with an X icon for Dialog components.
 * Positioned in the top-right corner of a Dialog by default.
 *
 * @example
 * <DialogContent>
 *   <DialogTitle>Settings</DialogTitle>
 *   <DialogCloseX />
 *   <p>Dialog content...</p>
 * </DialogContent>
 */
export const DialogCloseX = () => (
  <DialogPrimitive.Close className="focus-ring absolute top-4 right-4 opacity-70 transition hover:opacity-100 disabled:pointer-events-none">
    <X className="size-4" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
);

/**
 * Displays overlay behind the main dialog content. Necessary to achieve dialog's modality.
 */
export const DialogOverlay = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn(
      "animate-entrance-fade fixed inset-0 z-50 bg-black/20",
      className,
    )}
    data-testid="dialogOverlay"
    {...props}
  />
);

interface DialogContentElementProps
  extends ComponentProps<typeof DialogPrimitive.Content> {
  /**
   * Determines maximum width of the modal.
   * @default "lg"
   */
  size?: Size | null;
}

/**
 * Ready to use DialogContent. Provides default modality styling and size constraints. .
 */
export const DialogContentElement = ({
  size = "lg",
  className,
  children,
  ...props
}: DialogContentElementProps) => (
  <DialogPrimitive.Content
    className={cn(
      "animate-entrance-fade-zoom bg-surface fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg sm:rounded-lg",
      size && sizeToMaxWidthRecord[size],
      className,
    )}
    {...props}
  >
    {children}
  </DialogPrimitive.Content>
);

interface DialogContentProps extends DialogContentElementProps {}

/**
 * The main content container for the Dialog. Provides complete Dialog experience with reasonable defaults.
 *
 * Handles portal, overlay, size constraints, close button, centered positioning, animations.
 * If Dialog has more specified needs, it has to opt out from this component and use primitives directly.
 *
 *
 * @example
 * // Basic usage
 * <DialogContent>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <p>Dialog content</p>
 * </DialogContent>
 *
 * @example
 * // With custom size
 * <DialogContent size="sm">
 *   <DialogTitle>Small Dialog</DialogTitle>
 * </DialogContent>
 */
export const DialogContent = ({
  className,
  children,
  size,
  ...props
}: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogContentElement className={className} size={size} {...props}>
      {children}
      <DialogCloseX />
    </DialogContentElement>
  </DialogPortal>
);

/**
 * Container for dialog header elements.
 *
 * Typically contains `DialogTitle` and optionally `DialogDescription` components.
 *
 * @example
 * <DialogHeader>
 *   <DialogTitle>Settings</DialogTitle>
 *   <DialogDescription>Configure your preferences</DialogDescription>
 * </DialogHeader>
 */
export const DialogHeader = ({
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
 * Container for Dialog footer elements.
 *
 * Provides consistent spacing and layout for dialog actions like buttons.
 * On mobile, buttons are stacked with primary action on top.
 * On desktop, buttons are placed side-by-side with right alignment.
 *
 * @example
 * <DialogFooter>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save Changes</Button>
 * </DialogFooter>
 */
export const DialogFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

/**
 * Title component for Dialog.
 *

 * Automatically sets the correct ARIA attributes for accessibility.
 * Renders a semantically marked heading for the dialog content.
 * Required for accessibility but can be visually hidden if necessary.
 *
 * @example
 * <DialogTitle>Account Settings</DialogTitle>
 *
 * @example
 * // hidden visually
 * <DialogTitle className="hidden">Account Settings</DialogTitle>
 */
export const DialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

/**
 * Description component for Dialog.
 *
 * Provides additional context or explanation below the DialogTitle.
 * Automatically sets the correct ARIA attributes for accessibility.
 * Rendered with muted styling to create visual hierarchy.
 *
 * @example
 * <DialogDescription>
 *   Make changes to your profile information. Your data will be updated across all services.
 * </DialogDescription>
 */
export const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
);
