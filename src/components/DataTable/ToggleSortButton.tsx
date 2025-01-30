//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Header } from "@tanstack/react-table";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "../Button";

interface ToggleSortButtonProps<Data> {
  children?: ReactNode;
  header: Header<Data, unknown>;
}

export const ToggleSortButton = <Data,>({
  children,
  header,
}: ToggleSortButtonProps<Data>) => {
  const isSorted = header.column.getIsSorted();

  const nextSorting = header.column.getNextSortingOrder();

  const label = [
    nextSorting === "asc" ? "Sort ascending"
    : nextSorting === "desc" ? "Sort descending"
    : "Disable sorting",
    "by",
    typeof children === "string" ? children : null,
    "column",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      size="sm"
      variant="ghost"
      className="relative -left-2 w-full !justify-start !px-2"
      onClick={header.column.getToggleSortingHandler()}
      aria-label={label}
    >
      {children}
      {isSorted === "asc" ?
        <ArrowDownAZ className="size-4" />
      : isSorted === "desc" ?
        <ArrowUpZA className="size-4" />
      : <div aria-hidden className="size-4" />}
    </Button>
  );
};
