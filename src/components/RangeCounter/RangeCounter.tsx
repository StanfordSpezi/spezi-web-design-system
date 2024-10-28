//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type HTMLProps } from 'react'
import { cn } from '../../utils/className'

export interface RangeCounterProps
  extends Omit<HTMLProps<HTMLParagraphElement>, 'start'> {
  all: number
  end: number
  start: number
}

/**
 * Shows range of displayed items
 * Useful for showing pagination or filter results
 * */
export const RangeCounter = ({
  all,
  end,
  start,
  className,
  ...props
}: RangeCounterProps) => (
  <p
    className={cn('text-sm font-medium text-muted-foreground', className)}
    {...props}
  >
    {start}-{end} of {all}
  </p>
)
