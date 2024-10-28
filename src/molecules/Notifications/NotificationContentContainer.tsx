//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { HTMLProps } from 'react'
import { cn } from '../../utils/className'

interface NotificationContentContainerProps extends HTMLProps<HTMLDivElement> {}

export const NotificationContentContainer = ({
  className,
  ...props
}: NotificationContentContainerProps) => (
  <div className={cn('flex flex-1 flex-col gap-1', className)} {...props} />
)
