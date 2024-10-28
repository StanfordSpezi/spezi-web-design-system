//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { NextIntlClientProvider } from 'next-intl'
import { type ReactNode, useLayoutEffect, useMemo } from 'react'
import { messages as defaultMessages, type AllMessages } from '@/messages'
import { lightTheme } from '@/theme/light'
import { type Theme } from '@/theme/utils'

interface SpeziProviderProps {
  children?: ReactNode
  theme?: Partial<Theme>
  messages?: Partial<AllMessages>
}

/**
 * Configures messages and theme
 * */
export const SpeziProvider = ({
  children,
  messages,
  theme,
}: SpeziProviderProps) => {
  useLayoutEffect(() => {
    const resolvedTheme = { ...lightTheme, ...theme }
    Object.entries(resolvedTheme).forEach(([key, value]) => {
      if (value) {
        document.documentElement.style.setProperty(`--${key}`, value)
      }
    })
  }, [theme])

  const resolvedMessages = useMemo(
    () => ({ ...defaultMessages, ...messages }),
    [messages],
  )

  return (
    <NextIntlClientProvider messages={resolvedMessages} locale="en">
      {children}
    </NextIntlClientProvider>
  )
}
