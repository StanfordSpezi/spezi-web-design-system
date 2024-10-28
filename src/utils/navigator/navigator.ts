//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/**
 * Gets user locale, providing en-US as fallback
 * */
export const getNavigatorLanguage = () => {
  if (typeof window === 'undefined') return 'en-US' // Fallback for SSR
  return navigator.languages.at(0) ?? navigator.language ?? 'en-US'
}
/* eslint-enable @typescript-eslint/no-unnecessary-condition */
