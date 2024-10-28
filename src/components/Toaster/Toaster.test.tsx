//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from '@testing-library/react'
import { Toaster, toast } from '.'

describe('Toaster', () => {
  it('shows toast when triggerred', async () => {
    render(
      <>
        <Toaster />
        <button type="button" onClick={() => toast('Lorem')} />
      </>,
    )

    const toastHidden = screen.queryByText('Lorem')
    expect(toastHidden).not.toBeInTheDocument()

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const toastVisible = await screen.findByText('Lorem')
    expect(toastVisible).toBeInTheDocument()
  })
})
