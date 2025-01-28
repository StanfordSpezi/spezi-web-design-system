//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Info } from "lucide-react";
import type { HTMLProps } from "react";
import { cn } from "@/utils/className";
import { type Nil } from "@/utils/misc";
import { useNotificationContext } from "./NotificationContext";

type NotificationImageProps = Omit<HTMLProps<HTMLImageElement>, "src"> & {
  src: Nil<string>;
};

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
            "flex-center size-10 rounded-full bg-accent",
            className,
          )}
        >
          <Info className="text-foreground/25" />
        </div>
      }
    </div>
  );
};
