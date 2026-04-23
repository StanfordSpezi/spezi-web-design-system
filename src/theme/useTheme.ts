//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useContext } from "react";
import { SpeziContext, type ThemeMode } from "@/SpeziContext";

export interface UseThemeReturn {
  /**
   * The current theme preference (may be "system").
   */
  theme: ThemeMode;
  /**
   * The resolved theme that is actually applied ("light" or "dark").
   * When theme is "system", this reflects the OS preference.
   */
  resolvedTheme: "light" | "dark";
  /**
   * Updates the theme preference.
   * Persists to localStorage and updates the `data-theme` attribute on `<html>`.
   */
  setTheme: (theme: ThemeMode) => void;
}

/**
 * Hook to read and control the current theme.
 *
 * Must be used within a {@link SpeziProvider}.
 *
 * @example
 * ```tsx
 * const { theme, resolvedTheme, setTheme } = useTheme();
 *
 * // Toggle between light and dark
 * setTheme(resolvedTheme === "light" ? "dark" : "light");
 *
 * // Reset to follow system preference
 * setTheme("system");
 * ```
 */
export const useTheme = (): UseThemeReturn => {
  const context = useContext(SpeziContext);
  if (!context) {
    throw new Error(
      "useTheme must be used within SpeziProvider. Make sure to wrap your application with SpeziProvider",
    );
  }
  return {
    theme: context.theme,
    resolvedTheme: context.resolvedTheme,
    setTheme: context.setTheme,
  };
};
