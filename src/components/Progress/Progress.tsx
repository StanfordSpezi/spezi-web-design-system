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

const progressVariants = cva(
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
  VariantProps<typeof progressVariants>;

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
  color = "foreground",
  ...props
}: ProgressProps) => {
  const value = valueProp ?? 0;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-color={color}
      className={progressVariants({ color, className })}
      value={value}
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
          transform: `translateX(-${100 - (value === 0 ? -2 : value)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
};
