//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { flexRender } from "@tanstack/react-table";
import { type MouseEvent } from "react";
import { ToggleSortButton } from "@/components/DataTable/ToggleSortButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import type { DataTableViewProps } from "./DataTable";

export interface DataTableTableViewSpecificProps<Data> {
  /**
   * Row event click handler. Row is clicked only if it passes `isRowClicked` check.
   */
  onRowClick?: (data: Data, event: MouseEvent) => void;
  /**
   * Determines whether a mouse event represents a valid row click.
   *
   * This function helps filter click events when table rows contain interactive elements
   * by allowing you to exclude clicks that have bubbled up from child elements.
   *
   * By default, it checks if the event's target is a "TD" HTML element.
   */
  isRowClicked?: (event: MouseEvent) => boolean;
}

/**
 * Default function to determine if a mouse event represents a valid row click.
 * Returns true if the clicked element is a table cell (TD).
 *
 * @param event - The mouse event to evaluate
 * @returns Whether the event should be treated as a row click
 */
const isRowClickedDefault = (event: MouseEvent) =>
  (event.target as HTMLElement).tagName === "TD";

interface DataTableTableViewProps<Data>
  extends DataTableViewProps<Data>,
    DataTableTableViewSpecificProps<Data> {}

/**
 * Regular DataTable's TableView.
 * If no custom `children` is provided, this component is rendered by default.
 *
 * Renders a fully-featured table with headers, sortable columns, and row click handling.
 * Automatically applies proper styling and accessibility attributes to the table elements.
 */
export const DataTableTableView = <Data,>({
  table,
  rows,
  onRowClick,
  isRowClicked = isRowClickedDefault,
}: DataTableTableViewProps<Data>) => (
  <Table>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} isHoverable={false}>
          {headerGroup.headers.map((header) => {
            const columnContent =
              header.isPlaceholder ? null : (
                flexRender(header.column.columnDef.header, header.getContext())
              );
            return (
              <TableHead key={header.id}>
                {header.column.getCanFilter() ?
                  <ToggleSortButton header={header}>
                    {columnContent}
                  </ToggleSortButton>
                : columnContent}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && "selected"}
          onClick={
            onRowClick ?
              (event) => {
                if (isRowClicked(event)) {
                  onRowClick(row.original, event);
                }
              }
            : undefined
          }
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
