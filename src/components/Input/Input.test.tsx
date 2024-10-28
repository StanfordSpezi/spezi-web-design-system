//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { Input } from '.'

describe('Input', () => {
  it('renders input', () => {
    render(<Input />)

    const element = screen.getByRole('textbox')
    expect(element).toBeInTheDocument()
  })
})
