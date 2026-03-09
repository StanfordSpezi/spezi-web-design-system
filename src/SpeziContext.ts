//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
} from "react";

/**
 * Represents the user's theme preference.
 * - `"light"` forces light mode
 * - `"dark"` forces dark mode
 * - `"system"` follows the OS/browser preference
 */
export type ThemeMode = "light" | "dark" | "system";

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
