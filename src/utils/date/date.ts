//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isNil } from "es-toolkit";
import { type Nil } from "@/utils/misc";

type DateInput = Date | string | number;

/**
 * Formats date to include just the day, month and year.
 * The exact date format is based on locale.
 *
 * @example
 * // US format
 * "2/12/2019"
 *
 * @example
 * // PL format
 * "12.02.2019"
 */
export const formatDate = (value: DateInput) => {
  const date = new Date(value);
  return date.toLocaleDateString();
};

/**
 * Formats date like `formatDate`, but replaces Nil and empty strings with `null`.
 */
export const formatNilDate = (value: Nil<DateInput>) =>
  value === "" || isNil(value) ? null : formatDate(value);

/**
 * Formats date to include both day, month, year and hours, seconds.
 * The exact date format is based on locale.
 *
 * @example
 * // US format
 * "2/12/2019 11:31 PM"
 *
 * @example
 * // PL format
 * "12.02.2019 23:31"
 */
export const formatDateTime = (value: DateInput) => {
  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
};

/**
 * Formats date like `formatDateTime`, but replaces Nil and empty strings with `null`.
 */
export const formatNilDateTime = (value: Nil<DateInput>) =>
  value === "" || isNil(value) ? null : formatDateTime(value);
