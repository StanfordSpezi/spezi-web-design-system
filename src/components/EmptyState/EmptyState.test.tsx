//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { EmptyState } from '.'

describe('EmptyState', () => {
  it('renders empty state', () => {
    render(<EmptyState />)

    const element = screen.getByText(/No\sresults\sfound/)

    expect(element).toBeInTheDocument()
  })

  it('renders entityName', () => {
    render(<EmptyState entityName="users" />)

    const element = screen.getByText(/No\susers\sfound/)

    expect(element).toBeInTheDocument()
  })

  it('renders text filter within empty state', () => {
    render(<EmptyState textFilter="lorem" />)

    const element = screen.getByText(/lorem/)

    expect(element).toBeInTheDocument()
  })

  it('indicates data is filtered', () => {
    render(<EmptyState hasFilters />)

    const element = screen.getByText(/for your selected filters/)

    expect(element).toBeInTheDocument()
  })

  it('supports completely custom message', () => {
    render(<EmptyState>Data is missing</EmptyState>)

    const element = screen.getByText('Data is missing')

    expect(element).toBeInTheDocument()
  })
})
