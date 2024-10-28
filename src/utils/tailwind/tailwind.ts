//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { lightTheme } from '../../theme/light'

export const colorNameToTailwindVar = (colorName: string, alpha = true) =>
  `rgb(var(--${colorName})${alpha ? '/ <alpha-value>' : ''})`

const colorEntries = Object.keys(lightTheme).map(
  (key) => [key, colorNameToTailwindVar(key)] as const,
)

/**
 * Tailwind's theme colors
 * Uses light theme to get keys, but these are just CSS variable references
 * */
export const tailwindColors = Object.fromEntries(colorEntries)
