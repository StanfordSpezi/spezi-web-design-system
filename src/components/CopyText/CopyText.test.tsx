//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Toaster } from '../Toaster'
import { CopyText } from '.'

describe('CopyText', () => {
  const expectCopyValue = async (value: string) => {
    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    await waitFor(async () => {
      const clipboardText = await navigator.clipboard.readText()
      expect(clipboardText).toBe(value)
    })
  }

  it('copies children value if string provided', async () => {
    render(<CopyText>John Doe</CopyText>)

    await expectCopyValue('John Doe')
  })

  it('copies custom value', async () => {
    render(<CopyText value="special">John Doe</CopyText>)

    await expectCopyValue('special')
  })

  it('shows toast after copying', async () => {
    render(
      <>
        <Toaster />
        <CopyText>some</CopyText>
      </>,
    )

    await expectCopyValue('some')

    const toast = await screen.findByText('Copied to clipboard')
    expect(toast).toBeInTheDocument()
  })
})
