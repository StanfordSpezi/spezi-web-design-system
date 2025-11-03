//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Search } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { Input, type InputProps } from "../Input";

export const GlobalFilterInputContainer = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div className={cn("relative max-w-72 grow", className)} {...props} />
);

export const GlobalFilterInputIcon = ({
  className,
  ...props
}: ComponentProps<typeof Search>) => (
  <Search
    className={cn(
      "text-muted-foreground absolute top-2.5 left-3 size-5",
      className,
    )}
    aria-hidden="true"
    {...props}
  />
);

interface GlobalFilterInputInputProps extends InputProps {
  entityName?: string;
}

export const GlobalFilterInputInput = ({
  entityName,
  className,
  ...props
}: GlobalFilterInputInputProps) => {
  const placeholder = `Search${entityName ? ` ${entityName}` : ""}...`;
  return (
    <Input
      placeholder={placeholder}
      aria-label={placeholder}
      defaultValue=""
      className={cn("pl-10", className)}
      {...props}
    />
  );
};

interface GlobalFilterInputProps extends GlobalFilterInputInputProps {}

/**
 * Renders input for global text search.
 */
export const GlobalFilterInput = (props: GlobalFilterInputProps) => (
  <GlobalFilterInputContainer>
    <GlobalFilterInputIcon />
    <GlobalFilterInputInput {...props} />
  </GlobalFilterInputContainer>
);
