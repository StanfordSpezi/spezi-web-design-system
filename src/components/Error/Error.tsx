//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/utils/className";

interface ErrorProps extends ComponentProps<"p"> {
  /**
   * Whether to hide the error if `children` is empty.
   *
   * When `true`, Error will not render if children is null, undefined, or empty string.
   *
   * When `false`, Error will still render empty UI,
   * guaranteeing consistent spacing and no jumps on errors.
   * @default false
   */
  checkEmpty?: boolean;
  /**
   * The error message to display.
   */
  children?: ReactNode;
}

/**
 * A component for displaying inline error messages in forms fields and other UI elements.
 *
 * @example
 * // Basic usage
 * <Error>This field is required</Error>
 *
 * @example
 * // With checkEmpty
 * <Error checkEmpty>
 *   {formErrors.email}
 * </Error>
 */
export const Error = ({
  children,
  className,
  checkEmpty = false,
  ...props
}: ErrorProps) => {
  if (checkEmpty && !children) return null;
  return (
    <p
      className={cn(
        "text-destructive mt-1.5 mb-1 text-xs leading-none",
        "min-h-5", // min-h-5 guarantees consistent spacing between Form fields
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
