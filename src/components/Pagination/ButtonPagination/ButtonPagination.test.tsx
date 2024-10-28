//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from '@testing-library/react'
import { vitest } from 'vitest'
import { ButtonPagination } from './ButtonPagination'

describe('ButtonPagination', () => {
  it('renders one sibling to active, ellipses, first and last page; buttons are functional', () => {
    const onPageChange = vitest.fn()
    render(
      <ButtonPagination total={20} page={10} onPageChange={onPageChange} />,
    )

    const pages = [
      { name: /prev/i, page: 9 }, // prev button,
      { name: '1', page: 1 }, // first
      { name: '9', page: 9 },
      { name: '10', page: 10 }, // active and 2 around active
      { name: '11', page: 11 },
      { name: '20', page: 20 }, // last
      { name: /next/i, page: 11 }, // next button,
    ]

    pages.forEach(({ name, page }) => {
      const pageButton = screen.getByRole('button', { name })
      expect(pageButton).toBeInTheDocument()
      fireEvent.click(pageButton)
      expect(onPageChange).toHaveBeenLastCalledWith(page)
    })

    const ellipses = screen.getAllByText('More pages')
    expect(ellipses).toHaveLength(2)
  })

  it('doesnt render previous page button when at first page', () => {
    render(<ButtonPagination total={2} page={1} onPageChange={vitest.fn()} />)

    const prevButton = screen.queryByRole('button', { name: /prev/i })
    expect(prevButton).not.toBeInTheDocument()
  })

  it('doesnt render next page button when at last page', () => {
    render(<ButtonPagination total={2} page={2} onPageChange={vitest.fn()} />)

    const nextButton = screen.queryByRole('button', { name: /next/i })
    expect(nextButton).not.toBeInTheDocument()
  })

  it('renders more siblings when sibling prop passed', () => {
    render(
      <ButtonPagination
        total={20}
        page={10}
        siblings={3}
        onPageChange={vitest.fn()}
      />,
    )

    const siblings = [7, 8, 9]

    siblings.forEach((sibling) => {
      const pageButton = screen.getByRole('button', { name: String(sibling) })
      expect(pageButton).toBeInTheDocument()
    })
  })
})
