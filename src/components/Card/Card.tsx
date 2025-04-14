//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

export const cardVariants = {};

export const cardVariance = cva(
  "rounded-md border bg-card text-card-foreground shadow-xs",
  { variants: cardVariants },
);

export interface CardProps
  extends ComponentProps<"div">,
    VariantProps<typeof cardVariance> {
  asChild?: boolean;
}

export const Card = ({ className, asChild, ...props }: CardProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cardVariance({ className })} {...props} />;
};

type CardTitleProps = ComponentProps<"p"> & {
  asChild?: boolean;
};

export const CardTitle = ({ className, asChild, ...props }: CardTitleProps) => {
  const Comp = asChild ? Slot.Root : "h5";
  return <Comp className={cn("text-lg font-medium", className)} {...props} />;
};

type CardHeaderProps = ComponentProps<"div">;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <header
    className={cn("mb-4 flex items-center gap-2 px-5 pt-4", className)}
    {...props}
  />
);
