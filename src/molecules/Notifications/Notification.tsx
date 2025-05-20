//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { NotificationLink } from "@/molecules/Notifications/NotificationLink";
import { NotificationActions } from "./NotificationActions";
import { NotificationContentContainer } from "./NotificationContentContainer";
import { type NotificationContextType } from "./NotificationContext";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationImage } from "./NotificationImage";
import { NotificationMessage } from "./NotificationMessage";
import { NotificationRoot } from "./NotificationRoot";
import { NotificationTime } from "./NotificationTime";
import { NotificationTitle } from "./NotificationTitle";

export interface NotificationProps extends NotificationContextType {
  /**
   * Title text of notification.
   */
  title?: ReactNode;
  /**
   * Optional image URL displayed on the left side of the notification.
   * If not provided, a default icon is rendered instead.
   */
  image?: string;
  /**
   * Main message of the notification.
   */
  message?: ReactNode;
  /**
   * Date to display along the notification.
   */
  time?: Date;
  /**
   * Container for action buttons.
   */
  actions?: ReactNode;
  /**
   * If provided, the entire notification becomes a clickable link to this URL.
   */
  link?: string;
}

/**
 * Notification component that provides a complete notification UI.
 *
 * It composes smaller atomic notification elements, which can be reused to create your own composition of Notification.
 * It can be configured as a clickable link or standalone notification with actions.
 * The notification's read status affects styling through the context passed to child components.
 *
 * @example
 * // Basic notification with title and message
 * <Notification
 *   title="New message"
 *   message="You have a new message from Dr. Smith"
 *   isRead={false}
 * />
 *
 * @example
 * // Complete link notification
 * <Notification
 *   title="Appointment reminder"
 *   image="/profile-image.jpg"
 *   message="Your appointment with Dr. Smith is tomorrow at 2:00 PM"
 *   time={new Date("2024-07-15T14:00:00")}
 *   link="/appointments/123"
 *   isRead={false}
 * />
 *
 * @example
 * // Notification with additional actions
 * <Notification
 *   title="New message"
 *   message="You have a new message from Dr. Smith"
 *   actions={<Button>Dismiss message</Button>}
 * />
 */
export const Notification = ({
  title,
  image,
  message,
  time,
  actions,
  link,
  isRead,
}: NotificationProps) => {
  const content = (
    <>
      <NotificationImage src={image} />
      <NotificationContentContainer>
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        {(title || time) && (
          <NotificationHeader>
            {title && <NotificationTitle>{title}</NotificationTitle>}
            {time && <NotificationTime time={time} />}
          </NotificationHeader>
        )}
        {message && <NotificationMessage>{message}</NotificationMessage>}
        {actions && <NotificationActions>{actions}</NotificationActions>}
      </NotificationContentContainer>
    </>
  );

  const notificationContext = { isRead };

  return link ?
      <NotificationLink href={link} notification={notificationContext}>
        {content}
      </NotificationLink>
    : <NotificationRoot notification={notificationContext}>
        {content}
      </NotificationRoot>;
};
