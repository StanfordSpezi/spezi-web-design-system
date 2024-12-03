//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { FormError } from '.'

describe('ErrorState', () => {
  it('renders error state', () => {
    render(<FormError>Lorem</FormError>)

    const element = screen.getByRole('alert', { name: 'Lorem' })

    expect(element).toBeInTheDocument()
  })

  it('renders entityName', () => {
    render(<FormError entityName="users" />)

    const element = screen.getByText(/Fetching\susers\sfailed/)

    expect(element).toBeInTheDocument()
  })
})
