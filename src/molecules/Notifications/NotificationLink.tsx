//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  NotificationRoot,
  type NotificationRootProps,
} from "@/molecules/Notifications/NotificationRoot";
import { useSpeziContext } from "@/SpeziProvider";

interface NotificationLinkProps extends Omit<NotificationRootProps, "asChild"> {
  href: string;
}

/**
 * Composes {@link NotificationRoot} to provide a linkable notification.
 */
export const NotificationLink = ({
  notification,
  children,
  href,
}: NotificationLinkProps) => {
  const {
    router: { Link },
  } = useSpeziContext();
  return (
    <NotificationRoot asChild notification={notification}>
      <Link
        href={href}
        className="hover:bg-accent/50 cursor-pointer transition"
      >
        {children}
      </Link>
    </NotificationRoot>
  );
};
