//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/helpers'
import { NotFound } from './'

describe('NotFound', () => {
  it('renders not found error page', () => {
    renderWithProviders(
      <NotFound
        backPage={{ name: 'users', href: '/users' }}
        entityName="user"
      />,
    )

    const backLink = screen.getByRole('link', { name: /users/ })
    expect(backLink).toBeInTheDocument()

    const title = screen.getByText(`This user doesn't exist`)
    expect(title).toBeInTheDocument()
  })
})
