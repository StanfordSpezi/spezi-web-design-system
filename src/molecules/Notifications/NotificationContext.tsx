//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createContext, useContext } from "react";

export interface Notification {
  isRead: boolean;
}

export const NotificationContext = createContext<Notification | null>(null);

export const useNotificationContext = () => {
  const notification = useContext(NotificationContext);
  if (!notification) {
    throw new Error("Missing NotificationContext provider.");
  }
  return notification;
};
