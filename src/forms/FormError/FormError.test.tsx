//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { FormError } from '.'

const formError = { message: 'User already exists' }

describe('ErrorState', () => {
  it('renders error message', () => {
    render(<FormError formError={formError} />)

    const element = screen.getByText(formError.message)
    expect(element).toBeInTheDocument()
  })

  it('renders prefix', () => {
    render(<FormError formError={formError} prefix="Creating user failed. " />)

    const element = screen.getByText(/Creating user failed/)
    expect(element).toBeInTheDocument()
  })

  it('renders completely custom node', () => {
    render(<FormError formError={<>Lorem</>} />)

    const element = screen.getByRole('alert', { name: 'Lorem' })
    expect(element).toBeInTheDocument()
  })
})
