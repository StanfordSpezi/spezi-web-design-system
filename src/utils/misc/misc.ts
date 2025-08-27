//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { UrlObject } from "url";
import { isNil, isString } from "es-toolkit";
import { toast } from "../../components/Toaster";

/**
 * When `true`, the component will render its child as the root element
 * instead of creating a new DOM element. This allows passing the component's
 * props and styling to a custom child component using Radix UI's Slot pattern.
 *
 * Two major use cases:
 *  - to reuse styles of a component, but render it using different element
 *  - to inject event handlers without passing them manually
 *
 * @example
 * // Renders a link as a badge
 * <Badge asChild>
 *   <a href="https://example.com">Link Badge</a>
 * </Badge>
 *
 * @default false
 */
export type AsChildProp = boolean;

/**
 * Negates value.
 * Useful for functional patterns and state callbacks.
 */
export const not = (value: unknown) => !value;

/**
 * Type representing a value that can be either a direct value or a function that returns that value.
 * Useful for lazy initialization of state values.
 */
export type InitialState<T> = T | (() => T);

/**
 * Type representing a value that can be null or undefined.
 * Shorthand for `T | null | undefined`.
 */
export type Nil<T> = T | null | undefined;

/**
 * Type representing a URL that can be either a string or a URL object.
 */
export type Url = string | UrlObject;

/**
 * Make some fields in the object partial.
 *
 * @example
 * PartialSome<{ a: string, b: string, c: string }, 'a'> => { a?: string, b: string, c: string }
 */
export type PartialSome<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Make provided fields in the object required and the rest of fields partial.
 *
 * @example
 * RequiredSome<{ a: string, b: string, c: string }, 'a'> => { a: string, b?: string, c?: string }
 */
export type RequiredSome<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>;

/**
 * Prettify makes complex object types easier to read by flattening intersections.
 * Use this when you export or inspect inferred types. This only affects type presentation in tooling.
 *
 * @example
 * type A = { a: string };
 * type B = { b: number };
 * type Mixed = A & B;
 * type Readable = Prettify<Mixed>; // { a: string; b: number }
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Handles copying to clipboard and show confirmation toast.
 */
export const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    toast("Copied to clipboard");
  } catch {
    console.info("Copying failed");
  }
};

/**
 * Makes first letter uppercased.
 * @example upperFirst("lorem ipsum") => "Lorem ipsum"
 */
export const upperFirst = (value: string) =>
  `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;

/**
 * Generates an array with a specified length.
 */
export const times = <T>(length: number, callback: (index: number) => T) =>
  new Array(length).fill(undefined).map((_, index) => callback(index));

/**
 * Utility to dynamically resolve a strategy pattern.
 *
 * Provides correct types for enums, guaranteeing that `record` provides every enum key.
 *
 * @example
 * enum Message {
 *   success
 *   error
 * }
 * strategy({
 *   [Message.success]: "Saving file worked!",
 *   [Message.error]: "Saving file failed. Please try again later!",
 * }, Message.error) // "Saving file failed. Please try again later!"
 */
export const strategy = <T extends string | number | symbol, F>(
  record: Record<T, F>,
  enumValue: T,
) => record[enumValue];

/**
 * Ensures a value is a string, returning undefined if it's not.
 *
 * @example
 * ensureString("hello"); // "hello"
 * ensureString(123); // undefined
 */
export const ensureString = (value: unknown) =>
  isString(value) ? value : undefined;

/**
 * Type guard to check if a value is an object (and not null).
 *
 * @example
 * isObject({}); // true
 * isObject([]); // true
 * isObject(null); // false
 * isObject("string"); // false
 */
export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";

interface IsEmptyFunction {
  (value: string): value is "";
  (value: null | undefined): value is null | undefined;
  (value: unknown): boolean;
}

/**
 * Checks if a value is empty.
 * Handles strings, null/undefined, arrays, objects, and collections with size property.
 *
 * @example
 * isEmpty(""); // true
 * isEmpty(null); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty(new Set()); // true
 * isEmpty("hello"); // false
 * isEmpty([1, 2, 3]); // false
 */
// @ts-expect-error isEmpty implements predicate check
export const isEmpty: IsEmptyFunction = (value: unknown) => {
  if (value === "") return true;
  if (isNil(value)) return true;
  const valueIsObject = isObject(value);
  if (valueIsObject && "length" in value) return value.length === 0;
  if (valueIsObject && "size" in value) return value.size === 0;
  if (valueIsObject) return Object.entries(value).length === 0;
  return false;
};

/**
 * Formats a boolean value into a string representation.
 * Returns "true" or "false" based on the boolean value.
 *
 * @example
 * formatBoolean(true); // "true"
 * formatBoolean(false); // "false"
 */
export const formatBoolean = (value: boolean) => (value ? "true" : "false");

/**
 * Formats a boolean like `formatBoolean`, but returns `null` for nil values.
 *
 * @example
 * formatNilBoolean(true); // "true"
 * formatNilBoolean(false); // "false"
 * formatNilBoolean(null); // null
 * formatNilBoolean(undefined); // null
 */
export const formatNilBoolean = (value: Nil<boolean>) =>
  isNil(value) ? null : formatBoolean(value);

/**
 * Joins path segments, handling leading/trailing slashes between segments.
 * It accepts strings and numbers; ignores null/undefined/empty segments.
 *
 * @example
 * joinPaths("/api/v1/", "/users", "123"); // "/api/v1/users/123"
 *
 * @example
 * joinPaths("api", "users"); // "api/users"
 *
 * @example
 * joinPaths("https://example.com/", "/users/", "123"); // "https://example.com/users/123"
 *
 * @example
 * joinPaths("/a", "b?x=1#top"); // "/a/b?x=1#top"
 */
export const joinPaths = (
  ...segments: Array<string | number | null | undefined>
): string => {
  const normalizedSegments = segments
    .filter(
      (segment): segment is string | number =>
        segment != null && String(segment).length > 0,
    )
    .map((segment) => String(segment))
    .map((segment, index, arr) => {
      const isFirstSegment = index === 0;
      const isLastSegment = index === arr.length - 1;

      // Remove leading slashes from non-first segments to avoid "//" in the middle.
      const withoutLeadingSlash =
        isFirstSegment ? segment : segment.replace(/^\/+/, "");

      // Remove trailing slashes from non-last segments to avoid duplicate separators.
      const withoutTrailingSlash =
        isLastSegment ? withoutLeadingSlash : (
          withoutLeadingSlash.replace(/\/+$/, "")
        );

      return withoutTrailingSlash;
    })
    // Remove any segments that became empty after trimming (e.g., a standalone "/")
    .filter((segment) => segment.length > 0);

  if (normalizedSegments.length === 0) {
    return "";
  }

  return normalizedSegments.join("/");
};
