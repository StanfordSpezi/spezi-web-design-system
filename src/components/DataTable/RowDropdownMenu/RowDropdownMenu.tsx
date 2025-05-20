//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Ellipsis } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "../../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../DropdownMenu";

interface RowDropdownMenuProps {
  /**
   * Pass DropdownMenuContent children.
   */
  children?: ReactNode;
  itemName?: string;
}

/**
 * Standard DataTable row actions dropdown menu.
 */
export const RowDropdownMenu = ({
  children,
  itemName,
}: RowDropdownMenuProps) => (
  <div className="text-right">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="round"
          className="size-6"
          variant="ghost"
          aria-label={`Open actions${itemName ? ` for ${itemName}` : ""}`}
        >
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  </div>
);
