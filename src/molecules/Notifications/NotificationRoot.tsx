//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Slot } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import {
  type NotificationContextType as NotificationType,
  NotificationContext,
} from "./NotificationContext";

export interface NotificationRootProps extends ComponentProps<"article"> {
  notification: NotificationType;
  asChild?: boolean;
}

export const NotificationRoot = ({
  notification,
  className,
  asChild,
  ...props
}: NotificationRootProps) => {
  const Component = asChild ? Slot.Root : "article";
  return (
    <NotificationContext.Provider value={notification}>
      <Component
        className={cn(
          "flex gap-x-4 border-b border-b-neutral-200 px-3 py-4 last:border-b-0",
          className,
        )}
        {...props}
      />
    </NotificationContext.Provider>
  );
};
