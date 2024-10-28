//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from '@testing-library/react'
import { Popover, PopoverTrigger, PopoverContent } from '.'

describe('Popover', () => {
  it('renders accessible popover', async () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    )

    const dialog = screen.queryByRole('dialog')
    expect(dialog).not.toBeInTheDocument()

    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)

    const dialog2 = await screen.findByRole('dialog')
    expect(dialog2).toBeInTheDocument()
  })
})
