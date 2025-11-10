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
  useContext,
  useMemo,
} from "react";
import { messages as defaultMessages, type AllMessages } from "@/messages";

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

interface SpeziProviderProps extends SpeziContextType {
  children?: ReactNode;
  /**
   * Allows overriding default localization messages.
   */
  messages?: Partial<AllMessages>;
}

/**
 * Injects necessary context providers for Spezi components.
 * Wrap your entire application with this component
 * Injected elements:
 * - router configuration (Link component used by your application)
 * - CSS variables for theme
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
}: SpeziProviderProps) => {
  const resolvedMessages = useMemo(
    () => ({ ...defaultMessages, ...messages }),
    [messages],
  );

  const speziContextValue = useMemo(() => ({ router }), [router]);

  return (
    <NextIntlClientProvider messages={resolvedMessages} locale="en">
      <SpeziContext.Provider value={speziContextValue}>
        {children}
      </SpeziContext.Provider>
    </NextIntlClientProvider>
  );
};
