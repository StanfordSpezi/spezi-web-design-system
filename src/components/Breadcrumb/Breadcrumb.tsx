//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Slot } from "radix-ui";
import { type ComponentProps, type ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { useSpeziContext } from "@/SpeziProvider";
import { cn } from "@/utils/className";

export const Breadcrumb = ({ ...props }: ComponentProps<"nav">) => (
  <nav aria-label="breadcrumb" {...props} />
);

export const BreadcrumbList = ({
  className,
  ...props
}: ComponentProps<"ol">) => (
  <ol
    className={cn(
      "text-muted-foreground flex flex-wrap items-center gap-1 text-sm break-words sm:gap-2",
      className,
    )}
    {...props}
  />
);

export const BreadcrumbItem = ({
  className,
  ...props
}: ComponentProps<"li">) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
);

type BreadcrumbLinkProps = ComponentProps<"a"> & {
  asChild?: boolean;
};

export const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: BreadcrumbLinkProps) => {
  const {
    router: { Link },
  } = useSpeziContext();
  const Comp = asChild ? Slot.Root : Link;

  return (
    <Comp
      className={cn(
        "focus-ring hover:text-foreground rounded-sm transition",
        className,
      )}
      {...props}
    />
  );
};

export const BreadcrumbPage = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("text-foreground font-normal", className)}
    {...props}
  />
);

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("opacity-60 [&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex-center size-4", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);

interface BreadcrumbCompleteItemProps {
  isActive: boolean;
  label: ReactNode;
  href: string;
}

const BreadcrumbCompleteItem = ({
  href,
  isActive,
  label,
}: BreadcrumbCompleteItemProps) => {
  const {
    router: { Link },
  } = useSpeziContext();
  return (
    <>
      <BreadcrumbItem>
        {isActive ?
          <BreadcrumbPage className="max-w-25 truncate md:max-w-none">
            {label}
          </BreadcrumbPage>
        : <BreadcrumbLink asChild className="max-w-25 truncate md:max-w-none">
            <Link href={href}>{label}</Link>
          </BreadcrumbLink>
        }
      </BreadcrumbItem>
      {!isActive && <BreadcrumbSeparator />}
    </>
  );
};

interface BreadcrumbsProps {
  breadcrumbs: Array<{ href: string; label: ReactNode }>;
  /**
   * Represents the maximum number of breadcrumb elements to display.
   * Any breadcrumbs beyond this number will be hidden behind a dropdown.
   * @range [2, Infinity]
   * @default 3
   * */
  maxToDisplay?: number;
}

/**
 * Complete, ready to use Breadcrumbs component with truncation support
 * */
export const Breadcrumbs = ({
  breadcrumbs,
  maxToDisplay = 3,
}: BreadcrumbsProps) => {
  const {
    router: { Link },
  } = useSpeziContext();
  const firstBreadcrumb = breadcrumbs.at(0);
  const hasTruncatedBreadcrumbs = breadcrumbs.length > maxToDisplay;
  const remainingBreadcrumbs =
    hasTruncatedBreadcrumbs ?
      breadcrumbs.slice(-maxToDisplay + 1)
    : breadcrumbs.slice(1, maxToDisplay);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {firstBreadcrumb && (
          <BreadcrumbCompleteItem
            {...firstBreadcrumb}
            isActive={breadcrumbs.length === 1}
          />
        )}
        {hasTruncatedBreadcrumbs && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Toggle menu"
                  className="focus-ring rounded-sm"
                >
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {breadcrumbs
                    .slice(1, -maxToDisplay + 1)
                    .map((breadcrumb, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {remainingBreadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbCompleteItem
            {...breadcrumb}
            isActive={index === remainingBreadcrumbs.length - 1}
            key={index}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
