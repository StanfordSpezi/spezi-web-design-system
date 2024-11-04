//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Link } from '@tanstack/react-router'
import { RouteOff } from 'lucide-react'
import { type ComponentProps, type ReactNode } from 'react'
import { Button } from '@/components/Button'
import { cn } from '@/utils/className'

export const NotFoundIcon = ({
  className,
  ...props
}: Omit<ComponentProps<'div'>, 'children'>) => (
  <div
    className={cn('flex-center mb-2 size-20 rounded-full bg-muted', className)}
    {...props}
  >
    <RouteOff className="size-7" />
  </div>
)

export const NotFoundContainer = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex-center grow flex-col gap-1', className)}
    {...props}
  />
)

export const NotFoundTitle = ({
  className,
  ...props
}: ComponentProps<'h1'>) => (
  <h1 className={cn('text-2xl font-medium', className)} {...props} />
)

export const NotFoundParagraph = ({
  className,
  ...props
}: ComponentProps<'p'>) => (
  <p className={cn('text-muted-foreground', className)} {...props} />
)

interface NotFoundActionProps extends ComponentProps<typeof Button> {}

export const NotFoundAction = (props: NotFoundActionProps) => (
  <Button size="sm" className="mt-3" asChild {...props} />
)

interface NotFoundProps {
  /**
   * Configures where user should go instead
   * @example { name: "users list", href: "/user" }
   * */
  backPage: {
    name: ReactNode
    href: string
  }
  /**
   * Singular name of accessed entity
   * @example "user"
   * */
  entityName: ReactNode
  className?: string
}

export const NotFound = ({
  backPage,
  entityName,
  className,
}: NotFoundProps) => (
  <NotFoundContainer className={className}>
    <NotFoundIcon />
    <NotFoundTitle>This {entityName} doesn't exist</NotFoundTitle>
    <NotFoundParagraph>
      Please check your URL or return to {backPage.name}
    </NotFoundParagraph>
    <NotFoundAction>
      <Link href={backPage.href}>Go to {backPage.name}</Link>
    </NotFoundAction>
  </NotFoundContainer>
)
