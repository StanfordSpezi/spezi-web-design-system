//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type HTMLProps } from "react";
import { useNotificationContext } from "@/molecules/Notifications/NotificationContext";
import { cn } from "@/utils/className";
import { formatDateTime } from "@/utils/date";

interface NotificationTimeProps extends HTMLProps<HTMLTimeElement> {
  time: Date;
}

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
