//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from '@testing-library/react'
import { vitest } from 'vitest'
import { SideLabel } from '.'

describe('SideLabel', () => {
  it('renders functional label element', () => {
    const onChange = vitest.fn()

    render(
      <SideLabel label="Toggle">
        <input type="checkbox" onChange={onChange} />
      </SideLabel>,
    )

    const textElement = screen.getByText('Toggle')
    fireEvent.click(textElement)

    expect(onChange).toHaveBeenCalledOnce()

    const element = screen.getByLabelText('Toggle')
    expect(element.tagName).toBe('INPUT')
  })
})
