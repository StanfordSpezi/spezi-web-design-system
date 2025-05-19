//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { useNotificationContext } from "@/molecules/Notifications/NotificationContext";
import { cn } from "@/utils/className";
import { formatDateTime } from "@/utils/date";

interface NotificationTimeProps extends ComponentProps<"time"> {
  time: Date;
}

/**
 * Component responsible for rendering time in a notification
 * with proper formatting and styling based on read status.
 *
 * Time is displayed in the user's locale format, including both date and time.
 *
 * @example
 * <NotificationTime time={new Date("2024-01-01T12:00:00")} />
 */
export const NotificationTime = ({ time, ...props }: NotificationTimeProps) => {
  const notification = useNotificationContext();
  return (
    <time
      className={cn(
        "shrink-0 text-xs",
        !notification.isRead && "font-semibold",
      )}
      {...props}
    >
      {formatDateTime(time)}
    </time>
  );
};
