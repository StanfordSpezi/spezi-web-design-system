//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Label as LabelPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

/**
 * Styled label element for forms elements.
 */
export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    className={cn(
      "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);

type LabelContainerProps = ComponentProps<"div">;

/**
 * Container for labels. Ensures consistent spacing between field and label parts.
 */
export const LabelContainer = ({
  className,
  ...props
}: LabelContainerProps) => (
  <div className={cn("mb-2 flex gap-2", className)} {...props} />
);
