//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from 'react'
import { cn } from '@/utils/className'

export interface StateContainerProps extends ComponentProps<'div'> {
  grow?: boolean
  padding?: boolean
}

/**
 * Standard container for state components, like Spinner, EmptyState, ErrorState
 * Guarantees consistent spacing
 * */
export const StateContainer = ({
  className,
  grow,
  padding = true,
  ...props
}: StateContainerProps) => (
  <div
    className={cn(
      'flex-center',
      padding && 'py-8',
      grow && 'size-full grow',
      className,
    )}
    {...props}
  />
)
