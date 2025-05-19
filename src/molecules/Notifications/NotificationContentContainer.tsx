//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps } from "react";
import { cn } from "@/utils/className";

interface NotificationContentContainerProps extends ComponentProps<"div"> {}

/**
 * Container for Notification's main content.
 *
 * @example
 * <NotificationContentContainer>
 *   <NotificationMessage>You received a new message!</NotificationMessage>
 * </NotificationContentContainer>
 */
export const NotificationContentContainer = ({
  className,
  ...props
}: NotificationContentContainerProps) => (
  <div className={cn("flex flex-1 flex-col gap-1", className)} {...props} />
);
