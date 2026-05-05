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
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Card content goes here</CardContent>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Using asChild to render as a different element
 * <Card asChild>
 *   <article>Card content as an article</article>
 * </Card>
 * ```
 */
export const Card = ({ className, asChild, ...props }: CardProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp data-slot="card" className={cardVariance({ className })} {...props} />
  );
};

type CardHeaderProps = ComponentProps<"div">;

/**
 * Header component for {@link Card}.
 *
 * Provides consistent spacing and layout for card headers.
 * Typically contains a {@link CardTitle} and optionally other content like descriptions or actions.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Card content goes here</CardContent>
 * </Card>
 * ```
 */
export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <header
    data-slot="card-header"
    className={cn("mb-4 flex flex-col gap-1 px-5 pt-4", className)}
    {...props}
  />
);

type CardTitleProps = ComponentProps<"p"> & {
  asChild?: AsChildProp;
};

/**
 * Title component for {@link CardHeader|card headers}.
 *
 * Provides consistent styling for card titles. Typically wrapped by {@link CardHeader}.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Settings</CardTitle>
 * </CardHeader>
 * ```
 */
export const CardTitle = ({ className, asChild, ...props }: CardTitleProps) => {
  const Comp = asChild ? Slot.Root : "h5";
  return (
    <Comp
      data-slot="card-title"
      className={cn("text-lg font-medium", className)}
      {...props}
    />
  );
};

type CardDescriptionProps = ComponentProps<"p">;

/**
 * Description component for {@link CardHeader|card headers}.
 *
 * Renders muted secondary text below {@link CardTitle}. Typically wrapped by {@link CardHeader}.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Settings</CardTitle>
 *   <CardDescription>Manage your account preferences</CardDescription>
 * </CardHeader>
 * ```
 */
export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <p
    data-slot="card-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
);

type CardContentProps = ComponentProps<"div">;

/**
 * Content area component for {@link Card}.
 *
 * Provides consistent horizontal padding and bottom spacing for card body content.
 * Replaces the manual `<div className="p-5">` pattern.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Overview</CardTitle>
 *   </CardHeader>
 *   <CardContent>Your content here</CardContent>
 * </Card>
 * ```
 */
export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    data-slot="card-content"
    className={cn("px-5 pb-5", className)}
    {...props}
  />
);

type CardFooterProps = ComponentProps<"footer">;

/**
 * Footer component for {@link Card}.
 *
 * Provides consistent spacing for a right-aligned smaller line of text at the bottom of a card.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardContent>Main content</CardContent>
 *   <CardFooter>Synced from Apple Health</CardFooter>
 * </Card>
 * ```
 */
export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <footer
    data-slot="card-footer"
    className={cn(
      "text-muted-foreground px-5 pb-4 text-right text-sm",
      className,
    )}
    {...props}
  />
);
