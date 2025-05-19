//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type CellContext } from "@tanstack/react-table";
import { formatNilDate, formatNilDateTime } from "../../utils/date";
import { type Nil } from "../../utils/misc";

/**
 * Column cell formatter that formats date to include just the day, month and year.
 * The exact date format is based on locale.
 *
 * @example
 * // for US -  2/12/2019
 * columnHelper.accessor("updatedAt", {
 *   header: "Date",
 *   cell: dateColumn,
 * })
 */
export const dateColumn = <T>(props: CellContext<T, Nil<string | Date>>) =>
  formatNilDate(props.getValue()) ?? "";

/**
 * Column cell formatter that formats date to include both day, month, year and time.
 * The exact date format is based on locale.
 *
 * @example
 * // for US -  2/12/2019 11:31 PM
 * columnHelper.accessor("updatedAt", {
 *   header: "Date Time",
 *   cell: dateTimeColumn,
 * })
 */
export const dateTimeColumn = <T>(props: CellContext<T, Nil<string | Date>>) =>
  formatNilDateTime(props.getValue()) ?? "";
