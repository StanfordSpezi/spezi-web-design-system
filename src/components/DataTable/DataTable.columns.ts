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

export const dateColumn = <T>(props: CellContext<T, Nil<string | Date>>) =>
  formatNilDate(props.getValue()) ?? "";

export const dateTimeColumn = <T>(props: CellContext<T, Nil<string | Date>>) =>
  formatNilDateTime(props.getValue()) ?? "";
