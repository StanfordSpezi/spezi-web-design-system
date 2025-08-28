//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { CSSProperties, ComponentProps } from "react";
import { cn } from "@/utils/className";
import { Separator } from "../Separator";

interface DashedSeparatorProps extends ComponentProps<typeof Separator> {
  dashColor?: string;
  dashSize?: string;
  dashGap?: string;
}

/**
 * Visual dashed separator component for dividing content sections.
 * Use this when you need a more subtle visual break compared to a solid separator.
 * Configure the dash color, size, and gap.
 *
 * Built on top of [radix-ui Separator](https://www.radix-ui.com/primitives/docs/components/separator).
 *
 * @example
 * // Custom dash styling
 * <DashedSeparator
 *   decorative
 *   dashColor="red"
 *   dashSize="8px"
 *   dashGap="4px"
 * />
 *
 * @example
 * // Custom dash styling using class names
 * <DashedSeparator className={`
 *   [--dash-color:theme(colors.red.500)]
 *   [--dash-size:theme(spacing.4)]
 *   [--dash-gap:theme(spacing.2)]
 * `} />
 *
 * @example
 * // Basic horizontal separator
 * <div className="space-y-4">
 *   <p>Content above</p>
 *   <DashedSeparator decorative />
 *   <p>Content below</p>
 * </div>
 * @example
 * // Vertical separator
 * <div className="flex items-center gap-4">
 *   <p>Left content</p>
 *   <DashedSeparator decorative orientation="vertical" />
 *   <p>Right content</p>
 * </div>
 *
 * @example
 * // With text
 * <div className="space-y-4">
 *   <p>Content above</p>
 *   <DashedSeparator>
 *     <SeparatorText>Or</SeparatorText>
 *   </DashedSeparator>
 *   <p>Content below</p>
 * </div>
 */
export const DashedSeparator = ({
  dashColor,
  dashSize,
  dashGap,
  orientation,
  className,
  style,
  ...props
}: DashedSeparatorProps) => (
  <Separator
    orientation={orientation}
    className={cn(
      // We need this CSS variable so the bg class is applied in projects without a 'border' color var in the Tailwind config
      "[--default-border-color:theme(colors.border)]",
      orientation === "vertical" ? "[--tilt:0deg]" : "[--tilt:90deg]",
      "bg-[linear-gradient(var(--tilt),var(--dash-color,var(--default-border-color)),var(--dash-color,var(--default-border-color))_calc(100%_-_var(--dash-gap,theme(spacing.1))),transparent_calc(100%_-_var(--dash-gap,theme(spacing.1))),transparent_100%)]",
      "bg-[length:var(--dash-size,theme(spacing.4))_var(--dash-size,theme(spacing.4))]",
      className,
    )}
    style={
      {
        "--dash-color": dashColor,
        "--dash-size": dashSize,
        "--dash-gap": dashGap,
        backgroundColor: "transparent",
        ...style,
      } as CSSProperties
    }
    {...props}
  />
);
