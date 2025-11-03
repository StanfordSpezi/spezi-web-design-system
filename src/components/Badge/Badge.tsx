//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { type AsChildProp } from "@/utils/misc";

export const badgeVariance = cva(
  "inline-flex-center border transition focus-ring",
  {
    variants: {
      /**
       * Controls the visual variant of the badge.
       * - `default`: filled with primary color.
       * - `secondary`: filled with secondary color.
       * - `success`: filled with success color.
       *    Should be used for indicating positive and successful statues.
       * - `successLight`: filled with success color of reduced opacity.
       *    Should be used for indicating positive and successful statues.
       * - `warning`: filled with warning color.
       *    Should be used for bringing users' attention to potential upcoming problems or semi-success statuses.
       * - `warningLight`: filled with warning color of reduced opacity.
       *    Should be used for bringing users' attention to potential upcoming problems or semi-negative statuses.
       * - `destructive`: filled with destructive color.
       *    Should be used for indicating negative and unsuccessful statues.
       * - `destructiveLight`: filled with destructive color of reduced opacity.
       *    Should be used for indicating negative and unsuccessful statues.
       * - `outline`: bordered, transparent fill
       *
       * @default "default"
       */
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success:
          "border-transparent bg-success text-success-foreground shadow-sm hover:bg-success/80",
        successLight: "border-transparent bg-success/10 text-success",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-sm hover:bg-warning/80",
        warningLight: "border-transparent bg-warning/10 text-warning-dark",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        destructiveLight:
          "border-transparent bg-destructive/10 text-destructive",
        outline: "text-foreground",
      },
      /**
       * Affects padding, font size, border radius and gap.
       * - `sm`
       * - `lg`
       *
       * @default "sm"
       */
      size: {
        sm: "px-2.5 py-0.5 text-xs rounded-md gap-1 font-semibold",
        lg: "text-sm px-3 py-2 rounded-2xl gap-3 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends ComponentProps<"div">,
    VariantProps<typeof badgeVariance> {
  asChild?: AsChildProp;
}

/**
 * A status descriptor for UI elements.
 * Badges are used to highlight an item's status for quick recognition.
 *
 * @example
 * ```tsx
 * // Default badge
 * <Badge>New</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Different variants
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="destructiveLight">Warning</Badge>
 * <Badge variant="outline">Outline</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Different sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="lg">Large</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // As child element
 * <Badge asChild>
 *   <button>Click me</button>
 * </Badge>
 * ```
 */
export const Badge = ({
  className,
  variant,
  size,
  asChild,
  ...props
}: BadgeProps) => {
  const Component = asChild ? Slot.Root : "div";
  return (
    <Component
      className={cn(badgeVariance({ variant, size }), className)}
      {...props}
    />
  );
};
