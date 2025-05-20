//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ClassValue, clsx } from "clsx";

/**
 * Utility function for combining class names with conditional logic.
 * Removes falsy values, supports nested arrays and conditional checks.
 * Built on top of [clsx](https://github.com/lukeed/clsx).
 */
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
