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

export const InputOTPGroup = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div className={cn("flex items-center", className)} {...props} />
);

export const InputOTPSlot = ({
  index,
  className,
  ...props
}: ComponentProps<"div"> & { index: number }) => {
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

export const InputOTPSeparator = ({ ...props }: ComponentProps<"div">) => (
  <div role="separator" {...props}>
    <Minus className="text-muted-foreground w-4" />
  </div>
);

/**
 * Accessible one time password input.
 * InputOTP renders maxLength of slots for your secret - see Components/InputOTP#Default story
 * If you need to customize rendering - see Components/InputOTP#Custom story
 * */
export const InputOTP = ({
  maxLength,
  ...props
}: Omit<ComponentProps<typeof OTPInput>, "render">) => (
  <InputOTPRoot maxLength={maxLength} {...props}>
    <InputOTPGroup>
      {times(maxLength, (index) => (
        <InputOTPSlot index={index} key={index} />
      ))}
    </InputOTPGroup>
  </InputOTPRoot>
);
