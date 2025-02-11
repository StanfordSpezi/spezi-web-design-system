//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Search } from "lucide-react";
import { Input, type InputProps } from "../Input";

interface GlobalFilterInputProps extends InputProps {
  entityName?: string;
}
export const GlobalFilterInput = ({
  entityName,
  ...props
}: GlobalFilterInputProps) => {
  const placeholder = `Search${entityName ? ` ${entityName}` : ""}...`;
  return (
    <div className="relative max-w-72 grow">
      <Search className="absolute left-3 top-2.5 size-5 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        aria-label={placeholder}
        defaultValue=""
        className="pl-10"
        {...props}
      />
    </div>
  );
};
