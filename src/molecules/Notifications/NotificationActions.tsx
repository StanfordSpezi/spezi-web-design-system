//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps } from "react";
import { cn } from "@/utils/className";

interface NotificationActionsProps extends ComponentProps<"div"> {}

/**
 * Container for additional notification actions.
 * Some actions might add call to actions about notified, like "Delete", "Mark as read" and others.
 *
 * It captures and prevents propagation of all click events to avoid conflicts with parent Link elements.
 */
export const NotificationActions = ({
  onClick,
  className,
  ...props
}: NotificationActionsProps) => (
  <div
    className={cn("flex gap-2 self-start", className)}
    onClick={(event) => {
      // Stops capturing container click if the whole notification is wrapped with a Link element
      event.stopPropagation();
      event.preventDefault();
      onClick?.(event);
    }}
    {...props}
  />
);
