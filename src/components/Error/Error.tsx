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
  checkEmpty?: boolean;
  children?: ReactNode;
  className?: string;
  id?: string;
}

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
        "text-destructive mt-1.5 mb-1 min-h-5 text-xs leading-none",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
