//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { forwardRef, type HTMLProps } from "react";
import { cn } from "../../utils/className";

export const SeparatorText = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    className={cn(
      "flex-center absolute -top-2.5 left-0 w-full text-sm",
      className,
    )}
    ref={ref}
    {...props}
  >
    <div className="bg-surface px-4 text-border">{children}</div>
  </div>
));

SeparatorText.displayName = "SeparatorText";
