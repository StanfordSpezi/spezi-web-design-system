//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { HTMLProps } from "react";
import { cn } from "../../utils/className";

interface NotificationActionsProps extends HTMLProps<HTMLDivElement> {}

export const NotificationActions = ({
  onClick,
  className,
  ...props
}: NotificationActionsProps) => (
  <div
    className={cn("flex gap-2 self-start", className)}
    onClick={(event) => {
      // Stops capturing container click if whole notification is wrapped with Link element
      event.stopPropagation();
      event.preventDefault();
      onClick?.(event);
    }}
    {...props}
  />
);
