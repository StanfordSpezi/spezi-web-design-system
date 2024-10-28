//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Slot } from '@radix-ui/react-slot'
import { type ReactNode } from 'react'
import { cn } from '@/utils/className'
import {
  type Notification as NotificationType,
  NotificationContext,
} from './NotificationContext'

export interface NotificationProps {
  notification: NotificationType
  children: ReactNode
  className?: string
  asChild?: boolean
}

export const Notification = ({
  notification,
  children,
  className,
  asChild,
}: NotificationProps) => {
  const Component = asChild ? Slot : 'article'
  return (
    <NotificationContext.Provider value={notification}>
      <Component
        className={cn(
          'flex gap-x-4 border-b border-b-neutral-200 px-3 py-4 last:border-b-0',
          className,
        )}
      >
        {children}
      </Component>
    </NotificationContext.Provider>
  )
}
