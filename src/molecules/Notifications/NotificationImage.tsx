//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Info } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/utils/className";
import { type Nil } from "@/utils/misc";
import { useNotificationContext } from "./NotificationContext";

type NotificationImageProps = Omit<ComponentProps<"img">, "src"> & {
  src: Nil<string>;
};

/**
 * Notification image component that either renders an image or a default info icon.
 * Handles both custom notification images and a fallback icon when an image is not provided.
 *
 *
 * @example
 * ```ts
 * // With image URL
 * <NotificationImage src="/notification-image.jpg" alt="New message" />
 * ```
 *
 * @example
 * ```ts
 * // Without image - shows a default icon
 * <NotificationImage src={undefined} />
 * ```
 */
export const NotificationImage = ({
  alt = "Notification image",
  src,
  className,
  ...props
}: NotificationImageProps) => {
  const notification = useNotificationContext();
  return (
    <div
      className={cn(
        "flex-center shrink-0",
        notification.isRead && "opacity-70",
      )}
    >
      {src ?
        <img
          alt={alt}
          className={cn("size-10 rounded-lg object-cover", className)}
          src={src}
          {...props}
        />
      : <div
          className={cn(
            "flex-center bg-accent size-10 rounded-full",
            className,
          )}
        >
          <Info className="text-foreground/25" />
        </div>
      }
    </div>
  );
};
