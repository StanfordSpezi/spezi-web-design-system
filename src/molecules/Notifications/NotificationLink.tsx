//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Link } from '@tanstack/react-router'
import {
  Notification,
  type NotificationProps,
} from '@/molecules/Notifications/Notification'

interface NotificationLinkProps extends Omit<NotificationProps, 'asChild'> {
  href: string
}

export const NotificationLink = ({
  notification,
  children,
  href,
}: NotificationLinkProps) => (
  <Notification asChild notification={notification}>
    <Link to={href} className="cursor-pointer transition hover:bg-accent/50">
      {children}
    </Link>
  </Notification>
)
