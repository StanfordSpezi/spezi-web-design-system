//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { StateContainer } from '.'

describe('StateContainer', () => {
  it('renders div element', () => {
    render(<StateContainer data-testid="element" />)
    expect(screen.getByTestId('element')).toBeInTheDocument()
  })
})
