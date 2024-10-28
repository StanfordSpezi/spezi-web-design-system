//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from '@testing-library/react'
import { Avatar } from '.'

describe('Avatar', () => {
  it('renders user initials', () => {
    const { rerender } = render(<Avatar name="John Lorem Doe" />)

    const initials = screen.getByText('JD')
    expect(initials).toBeInTheDocument()

    rerender(<Avatar name="John" />)

    const initials2 = screen.getByText('JO')
    expect(initials2).toBeInTheDocument()
  })

  it('renders initials as fallback until image loads', () => {
    render(
      <Avatar
        src="https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png"
        name="John"
      />,
    )

    const initials = screen.getByText('JO')
    expect(initials).toBeInTheDocument()
    const img: HTMLImageElement = screen.getByRole('img')
    expect(img.complete).toBe(false)

    fireEvent.load(img)

    const initials2 = screen.queryByText('JO')
    expect(initials2).not.toBeInTheDocument()
  })

  it('renders custom fallback', () => {
    render(<Avatar fallback="Lorem" />)

    const element = screen.getByText('Lorem')
    expect(element).toBeInTheDocument()
  })
})
