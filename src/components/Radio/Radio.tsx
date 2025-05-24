//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

/**
 * State provider for the radio. Radio cannot be rendered without a parent.
 *
 * Use `RadioGroup` for a complete radio selection list component.
 */
export const RadioRoot = RadioGroupPrimitive.Root;

/**
 * Radio component, it implements just the Radio control input.
 * It must be wrapped in a RadioGroup.Root.
 *
 * Use `RadioGroup` for a complete radio selection list component.
 *
 * @example
 * <RadioRoot
 *   onValueChange={(value) => console.log(value)}
 *   defaultValue="unread"
 * >
 *   <Radio value="unread" />
 * </RadioRoot>
 *
 *
 * @example
 * // typically wrapped with SideLabel for proper labeling
 * <SideLabel label="Unread">
 *   <Radio value="unread" />
 * </SideLabel>
 */
export const Radio = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) => (
  <RadioGroupPrimitive.Item
    className={cn(
      "focus-ring flex-center border-input size-4 shrink-0 rounded-full border disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex-center bg-primary size-2 rounded-full" />
  </RadioGroupPrimitive.Item>
);
