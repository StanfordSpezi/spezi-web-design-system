//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

export interface TextareaProps extends ComponentProps<"textarea"> {}

export const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={cn(
      "focus-ring border-input bg-surface-primary placeholder:text-muted-foreground flex min-h-20 w-full rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
