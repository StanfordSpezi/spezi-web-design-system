//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Loader2 } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

export interface SpinnerProps extends ComponentProps<typeof Loader2> {}

/**
 * Loading indicator icon, shows infinite spinning animation.
 */
export const Spinner = ({ className, ...props }: SpinnerProps) => (
  <Loader2
    className={cn("text-muted-foreground animate-spin", className)}
    aria-label="Loading..."
    aria-live="polite"
    role="status"
    {...props}
  />
);
