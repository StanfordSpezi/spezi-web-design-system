//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { elements, Tab } from './Tabs.mocks'
import { Tabs } from '.'

describe('Tabs', () => {
  it('renders no content if no default value provided', () => {
    render(
      <Tabs>
        {elements.triggers}
        {elements.content}
      </Tabs>,
    )

    const contentElement = screen.queryByText(/content/)
    expect(contentElement).not.toBeInTheDocument()
  })

  it('renders correct tab', () => {
    render(<Tabs value={Tab.dolor}>{elements.content}</Tabs>)

    const contentElement = screen.getByText(/Dolor content/)
    expect(contentElement).toBeInTheDocument()
  })

  it('switches tabs', async () => {
    render(
      <Tabs>
        {elements.triggers}
        {elements.content}
      </Tabs>,
    )

    const ipsumTab = screen.getByRole('tab', { name: /Ipsum/ })
    await userEvent.click(ipsumTab)

    const ipsumContent = screen.getByText(/Ipsum content/)
    expect(ipsumContent).toBeInTheDocument()
  })
})
