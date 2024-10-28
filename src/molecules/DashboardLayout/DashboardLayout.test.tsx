//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/helpers'
import { DashboardLayout, MenuItem, PageTitle } from '.'

describe('DashboardLayout', () => {
  it('renders functional dashboard', () => {
    const menuLinks = <MenuItem href="/home" label="Home" isActive />
    renderWithProviders(
      <DashboardLayout
        aside={menuLinks}
        mobile={menuLinks}
        title={<PageTitle title="Home" />}
      >
        Content
      </DashboardLayout>,
    )

    const dashboardContent = screen.getByText('Content')
    expect(dashboardContent).toBeInTheDocument()

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toBeInTheDocument()

    const mobileMenu = screen.getByTestId('mobileMenu')
    expect(mobileMenu).not.toBeVisible()

    const menuTriggerButton = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(menuTriggerButton)

    expect(mobileMenu).toBeVisible()
    // Renders both home links - mobile and desktop
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinks).toHaveLength(2)
  })
})
