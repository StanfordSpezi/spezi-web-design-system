//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import { Async } from '.'

describe('Async', () => {
  it('renders special state if any provided', () => {
    render(<Async loading>Lorem</Async>)
    const content = screen.queryByText('Lorem')
    expect(content).not.toBeInTheDocument()
    const loading = screen.getByLabelText(/Loading/)
    expect(loading).toBeInTheDocument()
  })

  it('renders content if no special state', () => {
    render(<Async loading={false}>Lorem</Async>)
    const loading = screen.queryByLabelText(/Loading/)
    expect(loading).not.toBeInTheDocument()
    const content = screen.getByText('Lorem')
    expect(content).toBeInTheDocument()
  })

  it('allows wrapping special state with container', () => {
    render(
      <Async
        loading
        renderState={(state) => (
          <div>
            <p>Title</p>
            {state}
          </div>
        )}
      >
        Lorem
      </Async>,
    )
    const title = screen.getByText('Title')
    expect(title).toBeInTheDocument()
  })
})
