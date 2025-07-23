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
import { type AsChildProp } from "@/utils/misc";
import { ButtonPending } from "./ButtonPending";

export const buttonVariants = {
  /**
   * Controls the visual variant of the button.
   * - `default`: filled with primary color.
   *   Should be used for indicating primary action.
   * - `secondary`: filled with secondary color.
   *   Should be used for indicating secondary action.
   * - `outline`: bordered, transparent fill.
   *    Can be used for additional controls, icon buttons.
   * - `outlineBg`: bordered, filled with default surface background.
   * - `ghost`: no styled applied, unless hovered.
   *   Can be used for additional controls, icon buttons.
   * - `ghostPrimary`: primary color, with `ghost` styles on hover.
   *   Can be used for additional controls, icon buttons.
   * - `destructive`: filled with destructive color.
   *    Should be used for indicating negative and destructive actions.
   * - `link`: just a regular text with underline on hover.
   *
   * @default "default"
   */
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    outlineBg:
      "border border-input bg-surface-primary hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    ghostPrimary: "text-primary hover:bg-primary/10",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    link: "text-primary underline-offset-4 hover:underline",
  },
  /**
   * Affects height, font size, padding, radius and gap.
   * - `xs`
   * - `sm`
   * - `default`
   * - `lg`
   * - `round`: useful for round buttons with icons.
   *   No size or padding applied, provide through className.
   *
   * @default "default"
   */
  size: {
    xs: "h-6 text-xs px-2 py-1 rounded-md gap-1",
    sm: "h-9 rounded-md px-3 gap-2",
    default: "h-10 px-4 py-2 rounded-md gap-2",
    lg: "h-11 rounded-md px-8 gap-2.5",
    round: "rounded-full",
  },
};

export const buttonVariance = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: buttonVariants,
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariance> {
  asChild?: AsChildProp;
  /**
   * Shows loader over button, maintaining its width.
   * Use for visualizing mutation or form submission loading states.
   *
   * @default undefined
   */
  isPending?: boolean;
}

/**
 * Button component for user interactions with multiple style variants and sizes.
 *
 * Can render as other elements via `asChild` prop to apply button styles to custom components.
 * Supports loading state through `isPending` prop.
 *
 * @example
 * // Default primary button
 * <Button>Click me</Button>
 *
 * @example
 * // Secondary loading button
 * <Button variant="secondary" isPending>Something</Button>
 *
 * @example
 * // Link styled as a button
 * <Button asChild>
 *   <a href="/somewhere">Visit</a>
 * </Button>
 */
export const Button = ({
  className,
  variant,
  size,
  asChild,
  type = "button",
  isPending,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={buttonVariance({ variant, size, className })}
      type={type}
      aria-label={isPending ? "Loading" : undefined}
      {...props}
    >
      {isPending !== undefined ?
        <ButtonPending size={size} isPending={isPending}>
          {children}
        </ButtonPending>
      : children}
    </Comp>
  );
};
