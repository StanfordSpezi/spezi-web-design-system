//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Returns the ordinal suffix for a given number.
 *
 * @example
 * ```ts
 * getOrdinalSuffix(1)  // "st"
 * getOrdinalSuffix(2)  // "nd"
 * getOrdinalSuffix(3)  // "rd"
 * getOrdinalSuffix(4)  // "th"
 * getOrdinalSuffix(11) // "th"
 * getOrdinalSuffix(21) // "st"
 * ```
 */
export const getOrdinalSuffix = (num: number): string => {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
