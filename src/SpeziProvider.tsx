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
  useLayoutEffect,
  useMemo,
} from "react";
import { messages as defaultMessages, type AllMessages } from "@/messages";
import { lightTheme } from "@/theme/light";
import { type Theme } from "@/theme/utils";

/**
 * Allows injecting necessary router-related components.
 * Projects can have different routers:
 * Tanstack Router, React Router, Next router
 * */
interface SpeziContextRouter {
  /**
   * Link component. Make sure to provide your router's Link component.
   * */
  Link: (props: ComponentProps<"a">) => ReactNode;
}

export interface SpeziContextType {
  router: SpeziContextRouter;
}

export const SpeziContext = createContext<SpeziContextType | null>(null);

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
  theme?: Partial<Theme>;
  messages?: Partial<AllMessages>;
}

/**
 * Configures messages and theme
 * */
export const SpeziProvider = ({
  children,
  messages,
  theme,
  router,
}: SpeziProviderProps) => {
  useLayoutEffect(() => {
    const resolvedTheme = { ...lightTheme, ...theme };
    Object.entries(resolvedTheme).forEach(([key, value]) => {
      if (value) {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });
  }, [theme]);

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
