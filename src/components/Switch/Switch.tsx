//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Switch as SwitchPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

/**
 * A switch component for toggling between two states.
 * Built on top of [radix-ui Switch](https://www.radix-ui.com/primitives/docs/components/switch).
 *
 * @example
 * // Basic usage
 * <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
 *
 * @example
 * // With label
 * <SideLabel label="Enable notifications">
 *   <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
 * </SideLabel>
 *
 * @example
 * // Disabled state
 * <Switch disabled />
 */
export const Switch = ({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) => (
  <SwitchPrimitive.Root
    className={cn(
      "focus-ring data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "bg-surface-primary pointer-events-none block size-4 rounded-full shadow-lg ring-0 transition data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
);
