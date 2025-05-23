//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

export interface InputProps extends ComponentProps<"input"> {}

/**
 * A styled HTML input component that provides consistent styling across the application.
 * Suitable for text inputs, search fields, and other form inputs.
 *
 * @example
 * // Basic text input
 * <Input placeholder="Enter your name" />
 *
 * @example
 * // Search input
 * <Input type="search" placeholder="Search..." />
 *
 * @example
 * // Disabled input
 * <Input disabled value="Cannot edit" />
 */
export const Input = ({ className, type = "text", ...props }: InputProps) => (
  <input
    type={type}
    className={cn(
      "focus-ring border-input bg-surface-primary placeholder:text-muted-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
