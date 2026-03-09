//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { NextIntlClientProvider } from "next-intl";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { messages as defaultMessages, type AllMessages } from "@/messages";
import {
  SpeziContext,
  type SpeziContextType,
  type ThemeMode,
} from "@/SpeziContext";
import { DEFAULT_THEME_STORAGE_KEY } from "@/theme/getThemeScript";

export type {
  SpeziContextRouter,
  SpeziContextType,
  ThemeMode,
} from "@/SpeziContext";
export { SpeziContext, useSpeziContext } from "@/SpeziContext";

const getSystemTheme = (): "light" | "dark" =>
  (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) ?
    "dark"
  : "light";

interface SpeziProviderProps
  extends Omit<SpeziContextType, "theme" | "resolvedTheme" | "setTheme"> {
  children?: ReactNode;
  /**
   * Allows overriding default localization messages.
   */
  messages?: Partial<AllMessages>;
  /**
   * Initial theme mode.
   * - `"system"` (default): follows OS preference via `prefers-color-scheme`
   * - `"light"`: forces light mode
   * - `"dark"`: forces dark mode
   *
   * The user's choice is persisted in localStorage under {@link storageKey}.
   */
  defaultTheme?: ThemeMode;
  /**
   * localStorage key for persisting the theme preference.
   * @default "spezi-theme"
   */
  storageKey?: string;
}

/**
 * Injects necessary context providers for Spezi components.
 * Wrap your entire application with this component
 * Injected elements:
 * - router configuration (Link component used by your application)
 * - theme management (dark mode support)
 * - localization messages
 *
 * @example
 * // Usage with Next.js
 * ```ts
 * import { SpeziProvider, SpeziContextRouter } from "@stanfordspezi/spezi-web-design-system";
 * import Link from "next/link";
 *
 * const routerProps: SpeziContextRouter = {
 *   Link: ({ href, ...props }) => <Link href={href ?? "#"} {...props} />,
 * };
 * <SpeziProvider router={routerProps}>...</SpeziProvider>;
 * ```
 *
 * @example
 * // Usage with @tanstack/react-router
 * ```ts
 * import { SpeziProvider, SpeziContextRouter } from "@stanfordspezi/spezi-web-design-system";
 * import { Link } from "@tanstack/react-router";
 *
 * const routerProps: SpeziContextRouter = {
 *   Link: ({ href, ...props }) => <Link to={href} {...props} />,
 * };
 * <SpeziProvider router={routerProps}>...</SpeziProvider>;
 * ```
 */
export const SpeziProvider = ({
  children,
  messages,
  router,
  defaultTheme = "system",
  storageKey = DEFAULT_THEME_STORAGE_KEY,
}: SpeziProviderProps) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (
      (localStorage.getItem(storageKey) as ThemeMode | null) ?? defaultTheme
    );
  });

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    getSystemTheme,
  );

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? systemTheme : theme;

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      if (typeof window !== "undefined") {
        if (newTheme === "system") {
          document.documentElement.removeAttribute("data-theme");
          localStorage.removeItem(storageKey);
        } else {
          document.documentElement.dataset.theme = newTheme;
          localStorage.setItem(storageKey, newTheme);
        }
      }
    },
    [storageKey],
  );

  // Apply data-theme attribute on mount
  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setSystemTheme(getSystemTheme());
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const resolvedMessages = useMemo(
    () => ({ ...defaultMessages, ...messages }),
    [messages],
  );

  const speziContextValue = useMemo(
    () => ({ router, theme, resolvedTheme, setTheme }),
    [router, theme, resolvedTheme, setTheme],
  );

  return (
    <NextIntlClientProvider messages={resolvedMessages} locale="en">
      <SpeziContext.Provider value={speziContextValue}>
        {children}
      </SpeziContext.Provider>
    </NextIntlClientProvider>
  );
};
