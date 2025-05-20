//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Waits for provided milliseconds.
 * Useful for testing asynchronous operations.
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(undefined), ms));

/**
 * Uses performance API to measure callback's execution performance.
 */
export const logPerformance = <T>(name: string, callback: () => T) => {
  performance.mark(`mark-${name}`);
  const res = callback();
  performance.measure(name, `mark-${name}`);
  console.info(performance.getEntriesByName(name)[0]);
  return res;
};

/**
 * Throws a "not implemented" error.
 * Useful when implementing a feature partially in development environments.
 */
export const notImplementedError: any = () => {
  throw new Error("Not implemented");
};

/**
 * Shows a "not implemented" alert.
 * Useful when implementing a feature partially in development environments.
 */
export const notImplementedAlert: any = () => {
  alert("Not implemented");
};
