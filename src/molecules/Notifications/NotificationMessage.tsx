//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { HTMLProps } from "react";
import { useNotificationContext } from "@/molecules/Notifications/NotificationContext";
import { cn } from "@/utils/className";

interface NotificationMessageProps extends HTMLProps<HTMLParagraphElement> {}

export const NotificationMessage = ({
  className,
  ...props
}: NotificationMessageProps) => {
  const notification = useNotificationContext();
  return (
    <p
      className={cn(
        "flex-1 text-sm",
        notification.isRead && "text-foreground/70",
        className,
      )}
      {...props}
    />
  );
};
