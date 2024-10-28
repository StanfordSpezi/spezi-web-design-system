//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/className'

export const cardVariants = {}

export const cardVariance = cva(
  'rounded-md border bg-card text-card-foreground shadow-sm',
  { variants: cardVariants },
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariance> {
  asChild?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return <Comp className={cardVariance({ className })} ref={ref} {...props} />
  },
)
Card.displayName = 'Button'

type CardTitleProps = HTMLAttributes<HTMLParagraphElement> & {
  asChild?: boolean
}

export const CardTitle = ({ className, asChild, ...props }: CardTitleProps) => {
  const Comp = asChild ? Slot : 'h5'
  return <Comp className={cn('text-lg font-medium', className)} {...props} />
}

type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <header
    className={cn('mb-4 flex items-center gap-2 px-5 pt-4', className)}
    {...props}
  />
)
