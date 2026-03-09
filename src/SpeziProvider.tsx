//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { NextIntlClientProvider } from "next-intl";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { messages as defaultMessages, type AllMessages } from "@/messages";
import { DEFAULT_THEME_STORAGE_KEY } from "@/theme/getThemeScript";
import { type ThemeMode } from "@/theme/useTheme";

/**
 * Allows injecting the necessary router-related components.
 *
 * @remarks
 * Spezi Web is router-agnostic.
 * We need to provide a way to inject router-specific dependencies.
 * Projects can have different routers:
 * Tanstack Router, React Router, Next router.
 * See {@link SpeziProvider} for examples with Next and Tanstack Router.
 */
export interface SpeziContextRouter {
  /**
   * Link component. Make sure to provide your router's Link component.
   */
  Link: (props: ComponentProps<"a">) => ReactNode;
}

export interface SpeziContextType {
  router: SpeziContextRouter;
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
}

export const SpeziContext = createContext<SpeziContextType | null>(null);

/**
 * Returns SpeziContextType from context and validates its presence.
 * @throws {Error} When used outside SpeziProvider.
 */
export const useSpeziContext = () => {
  const value = useContext(SpeziContext);
  if (!value) {
    throw new Error(
      "useSpeziContext must be used within SpeziProvider. Make sure to wrap your application with SpeziProvider",
    );
  }
  return value;
};

const getSystemTheme = (): "light" | "dark" =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const resolveTheme = (theme: ThemeMode): "light" | "dark" =>
  theme === "system" ? getSystemTheme() : theme;

interface SpeziProviderProps extends Omit<SpeziContextType, "theme" | "resolvedTheme" | "setTheme"> {
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

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() =>
    resolveTheme(theme),
  );

  const applyThemeToDOM = useCallback((mode: ThemeMode) => {
    if (typeof window === "undefined") return;
    if (mode === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset.theme = mode;
    }
    setResolvedTheme(resolveTheme(mode));
  }, []);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      applyThemeToDOM(newTheme);
      if (typeof window !== "undefined") {
        if (newTheme === "system") {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, newTheme);
        }
      }
    },
    [applyThemeToDOM, storageKey],
  );

  // Apply theme on mount
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [applyThemeToDOM, theme]);

  // Listen for system preference changes when in "system" mode
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        setResolvedTheme(getSystemTheme());
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

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
