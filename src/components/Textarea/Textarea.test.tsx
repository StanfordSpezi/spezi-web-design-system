//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { Textarea } from '.'

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea />)

    const element = screen.getByRole('textbox')
    expect(element).toBeInTheDocument()
  })
})
