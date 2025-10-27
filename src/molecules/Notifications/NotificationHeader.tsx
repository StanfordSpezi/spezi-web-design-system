//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps } from "react";
import { cn } from "@/utils/className";

interface NotificationHeaderProps extends ComponentProps<"div"> {}

/**
 * Header component for notifications that provides a container for title, time and other elements.
 *
 * @example
 * ```ts
 * <NotificationHeader>
 *   <NotificationTitle>New Message</NotificationTitle>
 *   <NotificationTime time={new Date()} />
 * </NotificationHeader>
 * ```
 */
export const NotificationHeader = ({
  className,
  ...props
}: NotificationHeaderProps) => (
  <header className={cn("flex flex-1 gap-1", className)} {...props} />
);
