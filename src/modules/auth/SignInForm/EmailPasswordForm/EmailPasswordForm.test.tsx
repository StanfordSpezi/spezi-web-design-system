//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { FirebaseError } from '@firebase/app'
import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { type Auth } from 'firebase/auth'
import { vitest } from 'vitest'
import { renderWithProviders } from '@/tests/helpers'
import { EmailPasswordForm } from './EmailPasswordForm'

const authMock = {} as Auth
const signInWithEmailAndPasswordMock = vitest.fn()

vitest.mock('firebase/auth')

const getEmailField = () => screen.getByLabelText('Email')
const getPasswordField = () => screen.getByLabelText('Password')
const getSubmitButton = () => screen.getByRole('button')

const validCreds = {
  email: 'example@example.com',
  password: 'example1234',
}

const signIn = async () => {
  const user = userEvent.setup()
  await user.type(getEmailField(), validCreds.email)
  await user.type(getPasswordField(), validCreds.password)
  await user.click(getSubmitButton())
}

describe('EmailPasswordForm', () => {
  beforeEach(() => {
    vitest.resetAllMocks()
  })

  it('calls signIn function', async () => {
    renderWithProviders(
      <EmailPasswordForm
        signInWithEmailAndPassword={signInWithEmailAndPasswordMock}
        auth={authMock}
      />,
    )
    await signIn()

    expect(signInWithEmailAndPasswordMock).toHaveBeenLastCalledWith(
      expect.anything(),
      validCreds.email,
      validCreds.password,
    )
  })

  it('validates against empty values', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <EmailPasswordForm
        signInWithEmailAndPassword={signInWithEmailAndPasswordMock}
        auth={authMock}
      />,
    )

    await user.type(getPasswordField(), 'something')
    await user.click(getSubmitButton())

    expect(getEmailField()).toHaveAccessibleErrorMessage()
    expect(signInWithEmailAndPasswordMock).not.toHaveBeenCalled()
  })

  it('handles invalid creds error', async () => {
    signInWithEmailAndPasswordMock.mockImplementation(() => {
      throw new FirebaseError('auth/invalid-credential', 'invalidcreds')
    })
    renderWithProviders(
      <EmailPasswordForm
        signInWithEmailAndPassword={signInWithEmailAndPasswordMock}
        auth={authMock}
      />,
    )

    await signIn()

    expect(
      screen.getByText('Provided credentials are wrong. Please try again.'),
    ).toBeInTheDocument()
  })
})
