//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Notification,
  type NotificationProps,
} from '@/molecules/Notifications/Notification'
import { useSpeziContext } from '@/SpeziProvider'

interface NotificationLinkProps extends Omit<NotificationProps, 'asChild'> {
  href: string
}

export const NotificationLink = ({
  notification,
  children,
  href,
}: NotificationLinkProps) => {
  const {
    router: { Link },
  } = useSpeziContext()
  return (
    <Notification asChild notification={notification}>
      <Link
        href={href}
        className="cursor-pointer transition hover:bg-accent/50"
      >
        {children}
      </Link>
    </Notification>
  )
}
