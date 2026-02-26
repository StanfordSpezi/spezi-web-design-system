//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Ellipsis } from "lucide-react";
import { type ComponentProps, type ReactNode } from "react";
import { Button } from "../../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../DropdownMenu";

interface RowDropdownMenuProps
  extends Pick<ComponentProps<typeof DropdownMenuContent>, "align"> {
  /**
   * Pass DropdownMenuContent children.
   */
  children?: ReactNode;
  /**
   * Unique name of an item
   */
  itemName?: string;
}

/**
 * Standard DataTable row actions dropdown menu.
 *
 * Typically used within a DataTable column definition to provide per-row actions.
 *
 * @example
 * ```tsx
 * // Basic usage inside a DataTable column
 * columnHelper.display({
 *   id: "actions",
 *   header: "",
 *   cell: (props) => (
 *     <RowDropdownMenu itemName={props.original.name}>
 *       <DropdownMenuItem asChild>
 *         <Link href="/details">View</Link>
 *       </DropdownMenuItem>
 *       <DropdownMenuItem onClick={() => handleDelete(props.row.original)}>
 *         Delete
 *       </DropdownMenuItem>
 *     </RowDropdownMenu>
 *   ),
 * });
 * })
 * ```
 */
export const RowDropdownMenu = ({
  children,
  itemName,
  align = "end",
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
      <DropdownMenuContent align={align}>{children}</DropdownMenuContent>
    </DropdownMenu>
  </div>
);
