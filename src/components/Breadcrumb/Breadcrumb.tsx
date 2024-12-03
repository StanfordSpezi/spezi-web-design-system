//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Slot } from '@radix-ui/react-slot'
import { Link } from '@tanstack/react-router'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { cn } from '@/utils/className'

export const Breadcrumb = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'nav'>
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = 'Breadcrumb'

export const BreadcrumbList = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1 break-words text-sm text-muted-foreground sm:gap-2',
      className,
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

export const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

type BreadcrumbLinkProps = ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean
}

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn(
        'focus-ring rounded transition hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

export const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('opacity-60 [&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex-center size-4', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

interface BreadcrumbCompleteItemProps {
  isActive: boolean
  label: ReactNode
  href: string
}

const BreadcrumbCompleteItem = ({
  href,
  isActive,
  label,
}: BreadcrumbCompleteItemProps) => (
  <>
    <BreadcrumbItem>
      {isActive ?
        <BreadcrumbPage className="max-w-25 truncate md:max-w-none">
          {label}
        </BreadcrumbPage>
      : <BreadcrumbLink asChild className="max-w-25 truncate md:max-w-none">
          <Link to={href}>{label}</Link>
        </BreadcrumbLink>
      }
    </BreadcrumbItem>
    {!isActive && <BreadcrumbSeparator />}
  </>
)

interface BreadcrumbsProps {
  breadcrumbs: Array<{ href: string; label: ReactNode }>
  /**
   * Represents the maximum number of breadcrumb elements to display.
   * Any breadcrumbs beyond this number will be hidden behind a dropdown.
   * @range [2, Infinity]
   * @default 3
   * */
  maxToDisplay?: number
}

/**
 * Complete, ready to use Breadcrumbs component with truncation support
 * */
export const Breadcrumbs = ({
  breadcrumbs,
  maxToDisplay = 3,
}: BreadcrumbsProps) => {
  const firstBreadcrumb = breadcrumbs.at(0)
  const hasTruncatedBreadcrumbs = breadcrumbs.length > maxToDisplay
  const remainingBreadcrumbs =
    hasTruncatedBreadcrumbs ?
      breadcrumbs.slice(-maxToDisplay + 1)
    : breadcrumbs.slice(1, maxToDisplay)

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
                  className="focus-ring rounded"
                >
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {breadcrumbs
                    .slice(1, -maxToDisplay + 1)
                    .map((breadcrumb, index) => (
                      <DropdownMenuItem key={index}>
                        <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
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
  )
}
