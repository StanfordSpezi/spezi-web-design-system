//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { type ComponentProps, useContext } from "react";
import { cn } from "@/utils/className";
import { times } from "@/utils/misc";

/**
 * Root component for the OTP input.
 *
 * Provides the main container and context for the OTP input fields.
 * Controls behavior like focusing, keyboard navigation, and value management.
 *
 * @example
 * <InputOTPRoot maxLength={2}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *   </InputOTPGroup>
 * </InputOTPRoot>
 */
export const InputOTPRoot = ({
  className,
  containerClassName,
  ...props
}: ComponentProps<typeof OTPInput>) => (
  <OTPInput
    containerClassName={cn(
      "flex items-center gap-1.5 has-disabled:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
);

/**
 * Group component for OTP input slots.
 *
 * Used to organize OTP input slots into logical groups.
 * Useful for formatting OTP codes with visual separators between groups.
 *
 * @example
 * <InputOTPRoot maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTPRoot>
 */
export const InputOTPGroup = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div className={cn("flex items-center", className)} {...props} />
);

type InputOTPSlotProps = ComponentProps<"div"> & { index: number };

/**
 * Individual input slot for a single character in the OTP input.
 *
 * Displays the entered character and visual feedback when active.
 * Shows a blinking caret when the slot is focused but empty.
 * Automatically applies border radius to the first and last slots in a group.
 *
 * @example
 * <InputOTPSlot index={0} />
 */
export const InputOTPSlot = ({
  index,
  className,
  ...props
}: InputOTPSlotProps) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      className={cn(
        "flex-center border-input relative size-10 border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "ring-ring z-10 ring-2",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="flex-center pointer-events-none absolute inset-0">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
};

/**
 * Visual separator component for OTP input groups.
 *
 * Used to visually separate groups of OTP input slots.
 * Includes proper accessibility attributes for screen readers.
 *
 * @example
 * <InputOTPRoot>
 *   <InputOTPGroup>
 *     ...
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     ...
 *   </InputOTPGroup>
 * </InputOTPRoot>
 */
export const InputOTPSeparator = ({ ...props }: ComponentProps<"div">) => (
  <div role="separator" {...props}>
    <Minus className="text-muted-foreground w-4" />
  </div>
);

type InputOTPProps = Omit<ComponentProps<typeof OTPInput>, "render">;

/**
 * A component for handling one-time password (OTP) input.
 * Built on top of [input-otp](https://github.com/guilhermerodz/input-otp#otpinput).
 *
 * @example
 * // Basic usage
 * <InputOTP
 *   maxLength={6}
 *   onComplete={(code) => verifyCode(code)}
 * />
 *
 * @example
 * // With separator
 * <InputOTPRoot maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTPRoot>
 */
export const InputOTP = ({ maxLength, ...props }: InputOTPProps) => (
  <InputOTPRoot maxLength={maxLength} {...props}>
    <InputOTPGroup>
      {times(maxLength, (index) => (
        <InputOTPSlot index={index} key={index} />
      ))}
    </InputOTPGroup>
  </InputOTPRoot>
);
