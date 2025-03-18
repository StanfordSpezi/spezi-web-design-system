//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useContext,
} from "react";
import { cn } from "@/utils/className";
import { times } from "@/utils/misc";

export const InputOTPRoot = forwardRef<
  ElementRef<typeof OTPInput>,
  ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-1.5 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTPRoot.displayName = "InputOTPRoot";

export const InputOTPGroup = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

export const InputOTPSlot = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "flex-center relative size-10 border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="flex-center pointer-events-none absolute inset-0">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

export const InputOTPSeparator = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus className="w-4 text-muted-foreground" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

/**
 * Accessible one-time password component.
 * InputOTP renders maxLength of slots for your secret - see Components/InputOTP#Default story
 * If you need to customize rendering - see Components/InputOTP#Custom story
 * */
export const InputOTP = forwardRef<
  ElementRef<typeof OTPInput>,
  Omit<ComponentPropsWithoutRef<typeof OTPInput>, "render">
>(({ maxLength, ...props }, ref) => (
  <InputOTPRoot maxLength={maxLength} ref={ref} {...props}>
    <InputOTPGroup>
      {times(maxLength, (index) => (
        <InputOTPSlot index={index} key={index} />
      ))}
    </InputOTPGroup>
  </InputOTPRoot>
));
InputOTPRoot.displayName = "InputOTP";
