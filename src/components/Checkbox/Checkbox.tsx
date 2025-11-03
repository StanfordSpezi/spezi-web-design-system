//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

/**
 * Checkbox component, it implements just the Checkbox control input.
 *
 * Use {@link CheckboxGroup} for a complete checkbox selection list component.
 *
 * @example
 * ```tsx
 * // It's typically used with a SideLabel for proper labeling
 * <SideLabel label="Show unread only">
 *   <Checkbox checked={checked} onCheckedChange={setChecked} />
 * </SideLabel>
 * ```
 *
 * @example
 * ```tsx
 * // With aria-label for standalone usage
 * <Checkbox
 *   checked={checked}
 *   onCheckedChange={setChecked}
 *   aria-label="Checkbox"
 * />
 * ```
 */
export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    className={cn(
      "focus-ring flex-center border-input peer size-4 shrink-0 rounded-sm border disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex-center bg-primary size-2.5 rounded-xs" />
  </CheckboxPrimitive.Root>
);
