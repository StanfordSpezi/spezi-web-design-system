//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Separator as SeparatorPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

export const Separator = ({
  className,
  orientation = "horizontal",
  decorative,
  children,
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    decorative={decorative ?? !!children}
    orientation={orientation}
    className={cn(
      "bg-border relative shrink-0",
      orientation === "horizontal" ? "h-[1px] w-full" : "h -full w-[1px]",
      className,
    )}
    {...props}
  >
    {children}
  </SeparatorPrimitive.Root>
);
