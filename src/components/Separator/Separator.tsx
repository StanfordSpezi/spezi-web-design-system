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

/**
 * Visual separator component for dividing content sections.
 *
 * Built on top of [radix-ui Separator](https://www.radix-ui.com/primitives/docs/components/separator).
 *
 * @example
 * // Basic horizontal separator
 * <div className="space-y-4">
 *   <p>Content above</p>
 *   <Separator decorative />
 *   <p>Content below</p>
 * </div>
 *
 * @example
 * // Vertical separator
 * <div className="flex items-center gap-4">
 *   <p>Left content</p>
 *   <Separator decorative orientation="vertical" />
 *   <p>Right content</p>
 * </div>
 *
 * @example
 * // With text
 * <div className="space-y-4">
 *   <p>Content above</p>
 *   <Separator>
 *     <SeparatorText>Or</SeparatorText>
 *   </Separator>
 *   <p>Content below</p>
 * </div>
 */
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
