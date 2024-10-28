//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { NextIntlClientProvider } from 'next-intl'
import { type ReactNode } from 'react'

interface ProvidersProps {
  children?: ReactNode
}

// TODO(arkadiuszbachorski): Solve messages
const messages = {
  signIn: 'Sign In',
  signIn_provider: 'Sign in with { provider }',
  signIn_separator: 'or',
  signIn_field_email: 'Email',
  signIn_field_password: 'Password',
  signIn_submit: 'Sign In',
  signIn_formError_unknown: 'Unknown error. Please try again.',
  signIn_formError_invalidCredentials:
    'Provided credentials are wrong. Please try again.',
}

export const Providers = ({ children }: ProvidersProps) => (
  <NextIntlClientProvider messages={messages} locale="en">
    {children}
  </NextIntlClientProvider>
)
