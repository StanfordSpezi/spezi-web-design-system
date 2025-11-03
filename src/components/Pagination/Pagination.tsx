//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { Button, type ButtonProps } from "../Button";

/**
 * Primitives to build your Pagination.
 * If you're looking for batteries-included components, see `ButtonPagination` and `LinkPagination`.
 */
export const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex justify-center", className)}
    {...props}
  />
);

/**
 * Container for pagination items.
 *
 * Provides proper layout and spacing for pagination controls.
 * Renders as a semantic unordered list for accessibility.
 * Usually contains {@link PaginationItemContainer} components.
 */
export const PaginationContent = ({
  className,
  ...props
}: ComponentProps<"ul">) => (
  <ul className={cn("flex items-center gap-1", className)} {...props} />
);

/**
 * Container for individual pagination items.
 *
 * Renders as a semantic list item for accessibility.
 * Should wrap each individual pagination control.
 *
 * @example
 * ```tsx
 * <PaginationItemContainer>
 *   <PaginationItem>1</PaginationItem>
 * </PaginationItemContainer>
 * ```
 */
export const PaginationItemContainer = ({
  className,
  ...props
}: ComponentProps<"li">) => <li className={cn("", className)} {...props} />;

interface PaginationLinkProps extends ButtonProps {
  /**
   * Indicates the pagination control is currently active page.
   */
  isActive?: boolean;
}

/**
 * Displays a single pagination control such as a page number or navigation action.
 * Handles active state and proper accessibility attributes.
 * Extends the Button component with pagination-specific behavior.
 *
 * @example
 * ```tsx
 * <PaginationItem isActive>1</PaginationItem>
 * ```
 *
 * @example
 * ```tsx
 * <PaginationItem aria-label="Go to previous page">
 *    <PreviousIcon />
 * </PaginationItem>
 * ```
 */
export const PaginationItem = ({
  isActive,
  size = "sm",
  ...props
}: PaginationLinkProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "outline" : "ghost"}
    size={size}
    {...props}
  />
);

/**
 * Icon component for the previous page navigation button. Displays a left-pointing chevron icon.
 */
export const PaginationPreviousIcon = () => <ChevronLeft className="size-4" />;

/**
 * Navigation component for moving to the previous page.
 *
 * Displays a button with a left chevron icon by default.
 *
 * @example
 * ```tsx
 * <PaginationPrevious onClick={() => goToPreviousPage()} />
 * ```
 *
 * @example
 * ```tsx
 * // custom content
 * <PaginationPrevious>Previous</PaginationPrevious>
 * ```
 */
export const PaginationPrevious = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to previous page" {...props}>
    {children ?? <PaginationPreviousIcon />}
  </PaginationItem>
);

/**
 * Icon component for the next page navigation button. Displays a right-pointing chevron icon.
 */
export const PaginationNextIcon = () => <ChevronRight className="size-4" />;

/**
 * Navigation component for moving to the next page.
 *
 * Displays a button with a right chevron icon by default.
 *
 * @example
 * ```tsx
 * <PaginationNext onClick={() => goToNextPage()} />
 * ```
 *
 * @example
 * ```tsx
 * // custom content
 * <PaginationNext>Next</PaginationNext>
 * ```
 */
export const PaginationNext = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to next page" {...props}>
    {children ?? <PaginationNextIcon />}
  </PaginationItem>
);

/**
 * Ellipsis component for pagination.
 *
 * Indicates that pages have been omitted in the pagination sequence.
 * Hidden from screen readers while providing an appropriate screen reader text.
 * Commonly used when there are too many pages to display all page numbers.
 *
 * @example
 * ```tsx
 * <PaginationItemContainer>
 *   <PaginationEllipsis />
 * </PaginationItemContainer>
 * ```
 */
export const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex-center size-9", className)} {...props}>
    <Ellipsis className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
