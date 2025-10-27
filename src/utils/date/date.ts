//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isNil } from "es-toolkit";
import { type Nil } from "@/utils/misc";

export type DateInput = Date | string | number;

export interface DateRange {
  start?: Nil<DateInput>;
  end?: Nil<DateInput>;
}

/**
 * Formats date to include just the day, month and year.
 * The exact date format is based on locale.
 *
 * @example
 * ```ts
 * // US format
 * "2/12/2019"
 * ```
 *
 * @example
 * ```ts
 * // PL format
 * "12.02.2019"
 * ```
 */
export const formatDate = (value: DateInput) => {
  const date = new Date(value);
  return date.toLocaleDateString();
};

/**
 * Formats date like {@link formatDate}, but replaces Nil and empty strings with `null`.
 */
export const formatNilDate = (value: Nil<DateInput>) =>
  value === "" || isNil(value) ? null : formatDate(value);

/**
 * Formats date to include both day, month, year and hours, seconds.
 * The exact date format is based on locale.
 *
 * @example
 * ```ts
 * // US format
 * "2/12/2019 11:31 PM"
 * ```
 *
 * @example
 * ```ts
 * // PL format
 * "12.02.2019 23:31"
 * ```
 */
export const formatDateTime = (value: DateInput) => {
  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
};

/**
 * Formats date like {@link formatDateTime}, but replaces Nil and empty strings with `null`.
 */
export const formatNilDateTime = (value: Nil<DateInput>) =>
  value === "" || isNil(value) ? null : formatDateTime(value);

/**
 * Formats a date range into a human-readable string using locale-aware formatting.
 *
 * @example
 * ```ts
 * // Both dates provided
 * formatDateRange({ start: "2025-01-01", end: "2025-01-31" })
 * // Returns: "1/1/2025 – 1/31/2025"
 * ```
 *
 * @example
 * ```ts
 * // Only start date
 * formatDateRange({ start: "2025-01-01" })
 * // Returns: "from 1/1/2025"
 * ```
 *
 * @example
 * ```ts
 * // Only end date
 * formatDateRange({ end: "2025-01-31" })
 * // Returns: "ending 1/31/2025"
 * ```
 *
 * @example
 * ```ts
 * // No dates provided
 * formatDateRange({})
 * // Returns: null
 * ```
 */
export const formatDateRange = (
  dateRange: DateRange,
  formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }),
) => {
  if (dateRange.start && !dateRange.end) {
    const formattedDate = formatter.format(new Date(dateRange.start));
    return `from ${formattedDate}`;
  }

  if (dateRange.end && !dateRange.start) {
    const formattedDate = formatter.format(new Date(dateRange.end));
    return `ending ${formattedDate}`;
  }

  if (dateRange.start && dateRange.end) {
    return formatter.formatRange(
      new Date(dateRange.start),
      new Date(dateRange.end),
    );
  }

  return null;
};

/**
 * Formats a date range like {@link formatDateRange}, but returns `null` for nil date ranges.
 *
 * @example
 * ```ts
 * formatNilDateRange({ start: "2025-01-01", end: "2025-01-31" })
 * // Returns: "1/1/2025 – 1/31/2025"
 * ```
 *
 * @example
 * ```ts
 * formatNilDateRange(null)
 * // Returns: null
 * ```
 */
export const formatNilDateRange = (
  dateRange: Nil<DateRange>,
  formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }),
) => (isNil(dateRange) ? null : formatDateRange(dateRange, formatter));
