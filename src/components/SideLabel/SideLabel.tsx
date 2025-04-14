//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/utils/className";

type SideLabelProps = Omit<ComponentProps<"label">, "label"> & {
  label?: ReactNode;
  /**
   * Show label on right side
   * */
  reverse?: boolean;
  /**
   * Center content vertically
   * @default true
   * */
  center?: boolean;
};

/**
 * Component to use together with radio, checkbox or switch controls
 * */
export const SideLabel = ({
  children,
  className,
  label,
  reverse,
  center = true,
  ...props
}: SideLabelProps) => (
  <label
    className={cn(
      "flex cursor-pointer gap-2.5 select-none",
      reverse && "flex-row-reverse",
      center && "items-center",
      className,
    )}
    {...props}
  >
    {children}
    <div className="text-sm leading-none">{label}</div>
  </label>
);
