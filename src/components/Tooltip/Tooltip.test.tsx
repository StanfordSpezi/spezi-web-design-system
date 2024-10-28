//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Tooltip } from '.'

describe('Tooltip', () => {
  it('renders accessible tooltip', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip tooltip="Lorem">
        <button type="button" />
      </Tooltip>,
    )

    const tooltip = screen.queryByRole('tooltip')
    expect(tooltip).not.toBeInTheDocument()

    const trigger = screen.getByRole('button')
    await user.hover(trigger)

    const tooltip2 = await screen.findByRole('tooltip')
    expect(tooltip2).toBeInTheDocument()
    expect(trigger).toHaveAccessibleDescription('Lorem')
  })

  it('supports controlled state', () => {
    render(
      <Tooltip tooltip="Lorem" open={true}>
        <button type="button" />
      </Tooltip>,
    )

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
  })
})
