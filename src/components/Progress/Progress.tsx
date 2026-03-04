//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cva, type VariantProps } from "class-variance-authority";
import { Progress as ProgressPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { strategy } from "@/utils/misc";

const progressVariance = cva(
  "relative h-1 w-full overflow-hidden rounded-full",
  {
    variants: {
      color: {
        primary: "bg-primary/10",
        foreground: "bg-foreground/10",
        destructive: "bg-destructive/10",
      },
    },
  },
);

type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariance>;

/**
 * Displays a progress bar indicating completion of a task.
 *
 * @example
 * ```tsx
 * <Progress value={50} />
 * ```
 *
 * @example
 * ```tsx
 * <Progress value={75} color="destructive" />
 * ```
 */
export const Progress = ({
  className,
  value: valueProp,
  max: maxProp = 100,
  color = "foreground",
  ...props
}: ProgressProps) => {
  const max = Number.isFinite(maxProp) && maxProp > 0 ? maxProp : 100;
  const value = Math.min(Math.max(valueProp ?? 0, 0), max);
  const percentage = (value / max) * 100;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-color={color}
      className={progressVariance({ color, className })}
      value={value}
      max={max}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "size-full flex-1 transition",
          strategy(
            {
              primary: "bg-primary",
              foreground: "bg-foreground",
              destructive: "bg-destructive",
            },
            color,
          ),
        )}
        style={{
          transform: `translateX(-${100 - percentage}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
};
