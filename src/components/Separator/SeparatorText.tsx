//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

/**
 * Text to be displayed over a Separator
 */
export const SeparatorText = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex-center absolute -top-2.5 left-0 w-full text-sm",
      className,
    )}
    {...props}
  >
    <div className="bg-surface text-border px-4">{children}</div>
  </div>
);
