//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from '@testing-library/react'
import { vitest } from 'vitest'
import { ConfirmDeleteDialog } from '.'

describe('ConfirmDeleteDialog', () => {
  it('renders dialog with confirm delete button', () => {
    const onDelete = vitest.fn()
    render(
      <ConfirmDeleteDialog
        open={true}
        onOpenChange={vitest.fn()}
        onDelete={onDelete}
        entityName="user"
      />,
    )

    const deleteButton = screen.getByRole('button', { name: 'Delete user' })
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton)
    expect(onDelete).toHaveBeenCalled()
  })
})
