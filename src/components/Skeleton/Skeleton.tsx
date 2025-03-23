//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

type SkeletonProps = ComponentProps<"div"> & {
  /**
   * Full circle skeleton
   * */
  round?: boolean;
};

/**
 * Skeleton to indicate content loading state.
 * Useful if you load data partially and want to preserve layout size.
 * */
export const Skeleton = ({ className, round, ...props }: SkeletonProps) => (
  <div
    className={cn(
      "animate-pulse bg-accent",
      round ? "rounded-full" : "rounded-md",
      className,
    )}
    aria-hidden={true}
    {...props}
  />
);
