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

export const cardVariants = {};

export const cardVariance = cva(
  "rounded-md border bg-card text-card-foreground shadow-xs",
  { variants: cardVariants },
);

export interface CardProps
  extends ComponentProps<"div">,
    VariantProps<typeof cardVariance> {
  asChild?: AsChildProp;
}

/**
 * Card component for displaying content in a contained, styled container.
 *
 * Cards are used to group related information and actions, providing a clear visual hierarchy.
 * They can contain various elements like headers, content sections, and footers.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <div className="p-5">Card content goes here</div>
 * </Card>
 *
 * @example
 * // Using asChild to render as a different element
 * <Card asChild>
 *   <article>Card content as an article</article>
 * </Card>
 */
export const Card = ({ className, asChild, ...props }: CardProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cardVariance({ className })} {...props} />;
};

type CardHeaderProps = ComponentProps<"div">;

/**
 * Header component for Card.
 *
 * Provides consistent spacing and layout for card headers.
 * Typically contains a CardTitle and optionally other content like descriptions or actions.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <p className="text-sm text-muted-foreground">Card description</p>
 *   </CardHeader>
 *   <div className="p-5">Card content</div>
 * </Card>
 */
export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <header
    className={cn("mb-4 flex items-center gap-2 px-5 pt-4", className)}
    {...props}
  />
);

type CardTitleProps = ComponentProps<"p"> & {
  asChild?: AsChildProp;
};

/**
 * Title component for Card headers.
 *
 * Provides consistent styling for card titles. Typically wrapped by `CardHeader`.
 *
 * @example
 * <CardHeader>
 *   <CardTitle>Settings</CardTitle>
 * </CardHeader>
 */
export const CardTitle = ({ className, asChild, ...props }: CardTitleProps) => {
  const Comp = asChild ? Slot.Root : "h5";
  return <Comp className={cn("text-lg font-medium", className)} {...props} />;
};
