//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Info } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

/**
 * A button component with an information icon that can be used as a trigger.
 *
 * @example
 * ```tsx
 * // Basic usage with Tooltip
 * <Tooltip tooltip="Additional information here">
 *   <InfoButton />
 * </Tooltip>
 * ```
 */
export const InfoButton = ({
  className,
  ...props
}: ComponentProps<"button">) => (
  <button
    type="button"
    className={cn(
      "interactive-opacity text-muted-foreground size-4 rounded-md",
      className,
    )}
    aria-label="More information"
    {...props}
  >
    <Info className="size-full" />
  </button>
);
