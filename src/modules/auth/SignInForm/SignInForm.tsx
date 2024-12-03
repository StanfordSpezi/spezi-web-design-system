//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { FirebaseError } from '@firebase/app'
import {
  type Auth,
  type AuthProvider,
  type signInWithPopup,
  type signInWithEmailAndPassword,
} from 'firebase/auth'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { Separator, SeparatorText } from '@/components/Separator'
import { FormError } from '@/forms'
import { cn } from '@/utils/className'
import { EmailPasswordForm } from './EmailPasswordForm'

export const messages = {
  signIn_title: 'Sign In',
  signIn_provider: 'Sign in with {provider}',
  signIn_separator: 'or',
  signIn_field_email: 'Email',
  signIn_field_password: 'Password',
  signIn_submit: 'Sign In',
  signIn_formError_firebase: 'Sign in error: {code}. Please try again.',
  signIn_formError_unknown: 'Unknown error. Please try again.',
  signIn_formError_invalidCredentials:
    'Provided credentials are wrong. Please try again.',
}

export interface SignInFormProps {
  auth: Auth
  providers: Array<{
    provider: AuthProvider
    name: string
  }>
  enableEmailPassword: boolean
  signInWithPopup: typeof signInWithPopup
  signInWithEmailAndPassword: typeof signInWithEmailAndPassword
  className?: string
}

export const SignInForm = ({
  auth,
  providers,
  enableEmailPassword,
  className,
  signInWithPopup,
  signInWithEmailAndPassword,
}: SignInFormProps) => {
  const [formError, setFormError] = useState<string>()
  const t = useTranslations()
  return (
    <div className={cn('grid gap-4', className)}>
      <h1 className="mb-4 text-center text-2xl font-bold">
        {t('signIn_title')}
      </h1>
      <FormError formError={formError} />
      {providers.map((provider) => (
        <Button
          key={provider.name}
          variant="outlineBg"
          onClick={async () => {
            setFormError(undefined)
            try {
              await signInWithPopup(auth, provider.provider)
            } catch (error) {
              if (
                error instanceof FirebaseError &&
                error.code !== 'auth/popup-closed-by-user'
              ) {
                setFormError(
                  t('signIn_formError_firebase', { code: error.code }),
                )
              } else {
                setFormError(t('signIn_formError_unknown'))
              }
            }
          }}
        >
          {t('signIn_provider', { provider: provider.name })}
        </Button>
      ))}
      {enableEmailPassword && (
        <>
          {providers.length > 0 && (
            <Separator className="my-5">
              <SeparatorText>{t('signIn_separator')}</SeparatorText>
            </Separator>
          )}
          <EmailPasswordForm
            auth={auth}
            signInWithEmailAndPassword={signInWithEmailAndPassword}
          />
        </>
      )}
    </div>
  )
}
