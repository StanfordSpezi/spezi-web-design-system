//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import * as RadioPrimitive from "@radix-ui/react-radio-group";
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "../../utils/className";

/**
 * Container for Radio inputs
 * */
export const RadioGroup = RadioPrimitive.Root;

export const Radio = forwardRef<
  ElementRef<typeof RadioPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioPrimitive.Item
    ref={ref}
    className={cn(
      "focus-ring flex-center size-4 shrink-0 rounded-full border border-input disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioPrimitive.Indicator className="flex-center size-2 rounded-full bg-primary" />
  </RadioPrimitive.Item>
));
Radio.displayName = RadioPrimitive.Item.displayName;
