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

export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    className={cn(
      "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);
