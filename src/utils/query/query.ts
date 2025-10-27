//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isString } from "es-toolkit";
import { isObject } from "@/utils/misc";

/**
 * Minimal representation of a query state. Matches Tanstack Query result.
 */
export interface Query {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

/**
 * Combines multiple query states into a single aggregated state.
 *
 * @returns Combined query state where:
 * - `isLoading` is true if any query is loading
 * - `isError` is true if any query has an error
 * - `isSuccess` is true only if all queries are successful
 *
 * @example
 * ```ts
 * const combinedState = combineQueries([
 *   { isLoading: true },
 *   { isSuccess: true }
 * ]);
 * // Result: { isLoading: true, isError: false, isSuccess: false }
 * ```
 */
export const combineQueries = (queries: Query[]) => ({
  isLoading: queries.some((query) => query.isLoading),
  isError: queries.some((query) => query.isError),
  isSuccess: queries.every((query) => query.isSuccess),
});

/**
 * Parses an unknown error into a string message.
 * Handles various error formats including Error objects and plain strings.
 *
 * @example
 * ```ts
 * parseUnknownError(new Error("Something went wrong")); // "Something went wrong"
 * parseUnknownError("Custom error message"); // "Custom error message"
 * parseUnknownError({ message: "Object error" }); // "Object error"
 * parseUnknownError({}); // "Unknown error happened"
 * ```
 */
export const parseUnknownError = (error: unknown) =>
  isObject(error) && "message" in error && isString(error.message) ?
    error.message
  : isString(error) ? error
  : "Unknown error happened";
