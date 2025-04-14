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
 * Primitives to build your Pagination
 * If you're looking for batteries-included components, see ButtonPagination
 * */
export const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex justify-center", className)}
    {...props}
  />
);

export const PaginationContent = ({
  className,
  ...props
}: ComponentProps<"ul">) => (
  <ul className={cn("flex items-center gap-1", className)} {...props} />
);

export const PaginationItemContainer = ({
  className,
  ...props
}: ComponentProps<"li">) => <li className={cn("", className)} {...props} />;

interface PaginationLinkProps extends ButtonProps {
  isActive?: boolean;
}

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

export const PaginationPreviousIcon = () => <ChevronLeft className="size-4" />;

export const PaginationPrevious = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to previous page" {...props}>
    {children ?? <PaginationPreviousIcon />}
  </PaginationItem>
);

export const PaginationNextIcon = () => <ChevronRight className="size-4" />;

export const PaginationNext = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to next page" {...props}>
    {children ?? <PaginationNextIcon />}
  </PaginationItem>
);

export const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex-center size-9", className)} {...props}>
    <Ellipsis className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
